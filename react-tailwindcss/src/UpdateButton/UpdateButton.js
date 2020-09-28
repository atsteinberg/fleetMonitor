import React from 'react';
import { useSelector, useDispatch } from "react-redux";




function UpdateButton () {

  const ships=useSelector(function(state) {
    return state.ships;
  });
  
  const dispatch = useDispatch();
  
  const updatePositions = function() {
  
    ships.forEach((ship,index)=>fetch('https://services.marinetraffic.com/api/exportvessel/v:5/60edfa0064458f3e3576af989dd94ed7a016aac4/timespan:2880/protocol:json/mmsi:'+ship.mmsi.toString())
    .then( res=>res.json())
    .then (coordinates=>{
      
      if (coordinates.length>0) {
        console.log('Position:'+ship.shipName+':'+coordinates[0][1],coordinates[0][2]);
        dispatch({ type: "POSITION_UPDATE",index,lat:coordinates[0][1],lng:coordinates[0][2]})
      }
      else console.log("No Data for"+ship.shipName);
    }));
  
    
  };

return (
   <button className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded " onClick={updatePositions}>Update Positions</button> 
)
}


export default React.memo(UpdateButton);