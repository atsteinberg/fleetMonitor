import React from 'react';
import './App.css';
import "./style/main.css";
import { createStore } from "redux";
import { Provider,useSelector} from "react-redux";
import reducer from "./reducer.js";
import UpdateButton from "./UpdateButton/UpdateButton";

import MapComponent from './MapComponent/MapComponent';
import ShipTable from './ShipTable/ShipTable.js';


const store = createStore(reducer);



function App() {
   
  return (
    <div>
    <div className="p-4 m-4 bg-blue-600">
        <h1 className="text-2xl font-bold text-white">Fleet Monitor</h1>
      </div>

      <Provider store={store}>
      <UpdateButton/>
    <div className="flex flex-row flex-no-wrap">
        
    <ShipTable />
    <MapComponent/>
        
       
    
    </div>
    </Provider>
    </div>
  );
}

export default App;

