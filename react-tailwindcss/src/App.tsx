import React from 'react';
import './style/main.css';

import ShipTable from './components/ShipTable/ShipTable';

const App: React.FC<unknown> = () => {
  return (
    <div>
      <div className="p-4 m-4 bg-blue-600">
        <h1 className="text-2xl font-bold text-white">Fleet Spy</h1>
      </div>
      <ShipTable />
    </div>
  );
};

export default App;
