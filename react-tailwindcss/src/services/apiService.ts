import { UpdateAction, Ships } from '../types/redux';

export const updatePositions: (
  ships: Ships,
  dispatch: (arg0: UpdateAction) => void,
) => void = (ships, dispatch) => {
  ships.forEach((ship, index) =>
    fetch(
      'https://services.marinetraffic.com/api/exportvessel/v:5/' +
        process.env.REACT_APP_API_MARINETRAFFIC_PS07 +
        '/timespan:2880/protocol:json/mmsi:' +
        ship.mmsi.toString(),
    )
      .then((res) => {
        console.log('res', res);
        return res.json();
      })
      .then((coordinates) => {
        console.log(coordinates);
        if (coordinates.length > 0) {
          console.log(
            'Position:' + ship.shipName + ':' + coordinates[0][1],
            coordinates[0][2],
          );
          dispatch({
            type: 'POSITION_UPDATE',
            index,
            newDatedCoordinate: {
              time: coordinates[0][7],
              coordinates: {
                lat: coordinates[0][1],
                lng: coordinates[0][2],
              },
            },
          });
        } else console.log('No Data for' + ship.shipName);
      }),
  );
};
