import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Ship } from '../../types/ShipInterface';
import { Row } from 'react-table';
import { ShipMapLayer } from '../ShipMapLayer/ShipMapLayer';

const containerStyle = {
  width: '100%',
  height: '600px',
};

type Center = {
  lat: number;
  lng: number;
};

interface MapComponentProps {
  rows: Row<Ship>[];
  center: Center;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  rows,
  center,
}: MapComponentProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const loadHandler = (loadedMap: google.maps.Map) => {
    setMap(loadedMap);
  };

  const unmountHandler = () => {
    setMap(null);
  };

  return (
    <div className="md:px-20 py-8 w-full">
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_API_MAPS}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={3}
            onLoad={loadHandler}
            onUnmount={unmountHandler}
          >
            <ShipMapLayer map={map} ships={rows} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default React.memo(MapComponent);
