import { Positions, VoyageInfo } from '../types/apiDefs';
import { calculateDistance, calculateNextPoint } from './helpers';

export function calculateFuturePositions(
  // we will have a systematic error here, since port locations are
  // not always available. Instead of calculating from the port of arrival
  // we will start calculating estimated position at the last way point
  // expects VoyageInfo and time between plotted positions in minutes
  // add port data to route for this to give reasonable estimates
  data: VoyageInfo,
  step = 60,
): any {
  const futurePositions: any = {};

  const distancePerStep = (data.speedCalc * step) / 60;
  const stepInMs = step * 60 * 1000;
  const route = data.route;
  let stepNr = 0;

  let currentPosition = route[route.length - 1];
  let timeAtStep = data.etaCalc.getTime();
  let distanceToGo = data.distanceToGo;
  let alreadyMoved = 0;
  let wayPointIndex = route.length - 2;
  let distanceToNextWayPoint = calculateDistance(
    currentPosition,
    route[wayPointIndex],
  );
  while (wayPointIndex >= 0 && distanceToGo >= distancePerStep) {
    futurePositions[timeAtStep] = {
      ...currentPosition,
      time: new Date(timeAtStep),
      stepNr,
      distanceToGo,
    };
    while (distanceToNextWayPoint < distancePerStep - alreadyMoved) {
      // last segment in current direction
      // set current position to current waypoint and remember how far ship needed
      // to move to reach waypoint
      // set wayoint to be next waypoint
      // reset distance to next waypoint
      alreadyMoved = distanceToNextWayPoint;
      currentPosition = route[wayPointIndex];
      wayPointIndex--;
      if (wayPointIndex < 0) return futurePositions;
      distanceToNextWayPoint = calculateDistance(
        currentPosition,
        route[wayPointIndex],
      );
    }
    // update values for next step
    currentPosition = calculateNextPoint(
      currentPosition,
      route[wayPointIndex],
      distancePerStep - alreadyMoved,
    );
    timeAtStep -= stepInMs;
    distanceToNextWayPoint -= distancePerStep - alreadyMoved;
    distanceToGo -= distancePerStep;
    alreadyMoved = 0;
    stepNr++;
  }
  futurePositions[timeAtStep] = {
    ...currentPosition,
    time: new Date(timeAtStep),
    stepNr,
    distanceToGo,
  };
  return futurePositions;
}
