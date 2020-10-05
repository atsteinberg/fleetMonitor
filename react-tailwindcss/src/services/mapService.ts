import { Positions, VoyageInfo } from '../types/apiDefs';
import { calculateDistance, calculateNextPoint } from './helpers';

export function calculateFuturePositions(
  // we will have a systematic error here, since port locations are
  // not always available. Instead of calculating from the port of arrival
  // we will start calculating estimated position at the last way point
  step = 60,
  data: VoyageInfo,
): Positions {
  const futurePositions: Positions = {};
  const distancePerStep = (data.speedCalc * step) / 60;
  let previousWaypoint = data.route[data.route.length - 1];
  let currentPosition = previousWaypoint;
  let excessDistance = 0;
  let timeAtStep = data.etaCalc.getTime();
  futurePositions[timeAtStep] = {
    ...currentPosition,
    time: new Date(timeAtStep),
  };
  for (let i = 0; i < data.route.length - 1; i++) {
    const currentWaypoint = data.route[data.route.length - 2 - i];
    let distanceToNextWaypoint =
      calculateDistance(currentWaypoint, previousWaypoint) - excessDistance;
    while (distanceToNextWaypoint > distancePerStep) {
      distanceToNextWaypoint -= distancePerStep;
      timeAtStep -= step * 60 * 1000;
      currentPosition = calculateNextPoint(
        currentPosition,
        currentWaypoint,
        distancePerStep,
      );
      futurePositions[timeAtStep] = {
        ...currentPosition,
        time: new Date(timeAtStep),
      };
    }
    excessDistance = distanceToNextWaypoint;
    previousWaypoint = currentWaypoint;
  }

  return futurePositions;
}
