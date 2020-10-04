import React from 'react';
import './style/main.css';

import { Main } from './containers/Main/Main';

const App: React.FC<unknown> = () => {
  return (
    <div>
      <div className="p-4 m-4 bg-blue-400">
        <h1 className="md:inline-block text-2xl font-medium italic text-white .inline-block">
          Fleet
        </h1>
        <h1 className="md:inline-block text-2xl font-black text-white .inline-block">
          SPY
        </h1>
      </div>
      <Main />
    </div>
  );
};

export default App;
