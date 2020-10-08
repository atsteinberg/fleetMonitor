import { Row } from 'react-table';
import {
  PointInHistory,
  Ship,
  ShipHistory,
} from '../../../types/ShipInterface';

interface HistoryObj {
  [time: string]: PointInHistory;
}

interface History {
  previousStates: HistoryObj;
  futureStates: HistoryObj;
}

export const extractHistory = (ships: Ship[]): ShipHistory => {
  const history: History = {
    previousStates: {},
    futureStates: {},
  };
  ships.forEach((ship) => {
    const pastLocations = ship.history?.previousLocations || [];
    const futureLocations = ship.history?.futureLocations || [];
    pastLocations.forEach((datedLocation) => {
      if (!history.previousStates[datedLocation.time.toString()]) {
        history.previousStates[datedLocation.time] = {
          time: datedLocation.time,
          ships: [],
        };
      }
      history.previousStates[datedLocation.time].ships = [
        ...history.previousStates[datedLocation.time].ships,
        ship,
      ];
      futureLocations.forEach((datedLocation) => {
        if (!history.futureStates[datedLocation.time]) {
          history.futureStates[datedLocation.time] = {
            time: datedLocation.time,
            ships: [],
          };
        }
        history.futureStates[datedLocation.time].ships = [
          ...history.futureStates[datedLocation.time].ships,
          ship,
        ];
      });
    });
  });
  const previousStateTimes = Object.keys(history.previousStates).sort();
  const futureStateTimes = Object.keys(history.futureStates).sort();
  const previousStates = previousStateTimes.map(
    (time) => history.previousStates[time],
  );
  const futureStates = futureStateTimes.map(
    (time) => history.futureStates[time],
  );
  return { previousStates, futureStates };
};

// shipData.forEach((ship) => {
//   const pastLocations = ship.locations.previousLocations;
//   const futureLocations = ship.locations.futureLocations;
//   pastLocations.forEach((datedLocation) => {
//     if (!history.previousStates[datedLocation.time]) {
//       history.previousStates[datedLocation.time] = {
//         time: datedLocation.time,
//         ships: [],
//       };
//     }
//     history.previousStates[datedLocation.time].ships = [
//       ...history.previousStates[datedLocation.time].ships,
//       {
//         name: ship.name,
//         mmsi: ship.mmsi,
//         type: ship.type,
//         owner: ship.owner,
//         location: datedLocation,
//       },
//     ];
//     futureLocations.forEach((datedLocation) => {
//       if (!history.futureStates[datedLocation.time]) {
//         history.futureStates[datedLocation.time] = {
//           time: datedLocation.time,
//           ships: [],
//         };
//       }
//       history.futureStates[datedLocation.time].ships = [
//         ...history.futureStates[datedLocation.time].ships,
//         {
//           name: ship.name,
//           mmsi: ship.mmsi,
//           type: ship.type,
//           owner: ship.owner,
//           location: datedLocation,
//         },
//       ];
//     });
//   });
// });
