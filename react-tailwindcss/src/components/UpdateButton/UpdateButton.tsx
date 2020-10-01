import React from 'react';
import { updatePositions } from '../../services/apiService';
import { useSelector, useDispatch } from 'react-redux';
import { Ship } from '../../types/ShipInterface';

type State = {
  ships: Ship[];
};

function UpdateButton() {
  const ships = useSelector(function (state: State) {
    return state.ships;
  });
  const dispatch = useDispatch();

  return (
    <div>
      <button
        className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-8 rounded "
        onClick={() => updatePositions(ships, dispatch)}
      >
        Update Live Positions
      </button>
    </div>
  );
}
export default React.memo(UpdateButton);
