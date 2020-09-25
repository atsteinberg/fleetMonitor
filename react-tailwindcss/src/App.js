import React from 'react';
import './App.css';
import "./style/main.css";
import MapComponent from './MapComponent/MapComponent';
import ShipTable from './ShipTable/ShipTable.js';


function shipTable() {
  return (
    <div>
    <div className="p-4 m-4 bg-blue-600">
        <h1 className="text-2xl font-bold text-white">Fleet Monitor</h1>
      </div>
    <div className="h-64 flex flex-row">
      
      <div className="p-4 m-4 bg-blue-600">
        <ShipTable/>
      </div>
      <button className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Button</button>

      
      <div className="m-4 rounded">
      <MapComponent/>
      </div>
    </div>
    </div>
  );
}

export default shipTable;

