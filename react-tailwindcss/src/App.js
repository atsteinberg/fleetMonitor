import React from 'react';
import './App.css';
import "./style/main.css";
import { createStore } from "redux";
import { Provider} from "react-redux";
import reducer from "./reducer.js";

import MapComponent from './MapComponent/MapComponent';
import ShipTable from './ShipTable/ShipTable.js';


const store = createStore(reducer);

function shipTable() {
  return (
    <div>
    <div className="p-4 m-4 bg-blue-600">
        <h1 className="text-2xl font-bold text-white">Fleet Monitor</h1>
      </div>

      <Provider store={store}>

    <div className="flex flex-row">
      
      <div className="p-4 m-4 bg-blue-600 rounded">
        <ShipTable/>
      </div>
      {/* <button className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Button</button> */}

      <div className="m-4 rounded">
      <MapComponent/>
      </div>
    </div>
    </Provider>
    </div>
  );
}

export default shipTable;

