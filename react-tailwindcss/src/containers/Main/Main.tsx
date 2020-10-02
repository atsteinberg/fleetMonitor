import React, { useState } from 'react';
import MapComponent from '../../components/MapComponent/MapComponent';
import ShipTable from '../../components/ShipTable/ShipTable';
import UpdateButton from '../../components/UpdateButton/UpdateButton';

const mapCenter = { lat: 52.430514, lng: 4.162088 };

// interface MainProps {}

export const Main: React.FC<unknown> = ({}) => {
  const [rows, setRows] = useState([]);
  return (
    <div className="flex flex-col items-center">
      <MapComponent rows={rows} center={mapCenter} />
      <UpdateButton />
      <ShipTable setRows={setRows}></ShipTable>
    </div>
  );
};
