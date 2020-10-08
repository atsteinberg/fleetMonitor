import React, { useState } from 'react';
import { Row } from 'react-table';
import MapComponent from '../../components/Map/MapComponent/MapComponent';
import ShipTable from '../../components/Table/ShipTable/ShipTable';
import UpdateButton from '../../components/UpdateButton/UpdateButton';
import { ShipTimeslice } from '../../types/Ship';

const mapCenter = { lat: 52.430514, lng: 4.162088 };

export const Main: React.FC<unknown> = ({}) => {
  const [rows, setRows] = useState<Row<ShipTimeslice>[]>([]);
  return (
    <div className="flex flex-col items-center">
      <MapComponent rows={rows} center={mapCenter} />
      <UpdateButton />
      <ShipTable setRows={setRows}></ShipTable>
    </div>
  );
};
