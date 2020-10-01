import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function UpdateButton() {
  const ships = useSelector(function (state) {
    return state.ships;
  });

  const dispatch = useDispatch();

  const updatePositions = function () {
    ships.forEach((ship, index) =>
      fetch(
        'https://services.marinetraffic.com/api/exportvessel/v:5/' +
          process.env.REACT_APP_API_MARINETRAFFIC +
          '/timespan:2880/protocol:json/mmsi:' +
          ship.mmsi.toString(),
      )
        .then((res) => res.json())
        .then((coordinates) => {
          if (coordinates.length > 0) {
            console.log(
              'Position:' + ship.shipName + ':' + coordinates[0][1],
              coordinates[0][2],
            );
            dispatch({
              type: 'POSITION_UPDATE',
              index,
              lat: parseFloat(coordinates[0][1]),
              lng: parseFloat(coordinates[0][2]),
              updated: coordinates[0][7],
            });
          } else console.log('No Data for' + ship.shipName);
        }),
    );
  };

  return (
    <div>
      <button
        className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-8 rounded "
        onClick={updatePositions}
      >
        Update Live Positions
      </button>
    </div>
  );
}

export default React.memo(UpdateButton);
