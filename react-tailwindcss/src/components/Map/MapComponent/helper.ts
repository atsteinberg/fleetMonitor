import { Row } from 'react-table';
import { Ship, ShipHistory } from '../../../types/ShipInterface';

export const extractHistory = (rows: Row<Ship>[]): ShipHistory => {
  const history: ShipHistory = {
    previousStates: [],
    futureStates: [],
  };
  rows.forEach((ship) => {
    const pastLocations = ship.original.history?.previousStates || [];
    const futureLocations = ship.original.history?.futureStates || [];
    pastLocations.forEach((datedLocation) => {
      if (!history.previousStates[datedLocation.time]) {
        history.previousStates[datedLocation.time] = {
          time: datedLocation.time,
          ships: [],
        };
      }
      history.previousStates[datedLocation.time].ships = [
        ...history.previousStates[datedLocation.time].ships,
        ship.original,
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
          ship.original,
        ];
      });
    });
  });
  return history;
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
