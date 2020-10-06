import { Positions, VoyageInfo } from '../types/apiDefs';
import { calculateDistance, calculateNextPoint } from './helpers';

export function calculateFuturePositions(
  // we will have a systematic error here, since port locations are
  // not always available. Instead of calculating from the port of arrival
  // we will start calculating estimated position at the last way point
  data: VoyageInfo,
  step = 60,
): any {
  const futurePositions: Positions = {};

  const distancePerStep = (data.speedCalc * step) / 60;
  let previousWaypoint = data.route[data.route.length - 1];
  let currentPosition = previousWaypoint;
  let excessDistance = 0;
  let timeAtStep = data.etaCalc.getTime();
  let distanceToGo = data.distanceToGo;
  let j = 0;
  futurePositions[timeAtStep] = {
    ...currentPosition,
    distanceToGo,
    step: j,
    waypoint: previousWaypoint,
    time: new Date(timeAtStep),
  };
  let i = 0;

  while (distanceToGo > 100 && i < data.route.length - 1) {
    const currentWaypoint = data.route[data.route.length - 2 - i];
    let distanceToNextWaypoint =
      calculateDistance(currentWaypoint, previousWaypoint) - excessDistance;
    while (distanceToNextWaypoint > distancePerStep) {
      distanceToNextWaypoint -= distancePerStep;
      distanceToGo -= distancePerStep;
      timeAtStep -= step * 60 * 1000;
      currentPosition = calculateNextPoint(
        currentPosition,
        currentWaypoint,
        distancePerStep,
      );
      futurePositions[timeAtStep] = {
        ...currentPosition,
        step: j,
        distanceToGo,
        distance: distanceToNextWaypoint,
        waypoint: previousWaypoint,
        time: new Date(timeAtStep),
      };
      j++;
    }
    i++;
    excessDistance = distanceToNextWaypoint;
    previousWaypoint = currentWaypoint;
  }

  return futurePositions;
}
