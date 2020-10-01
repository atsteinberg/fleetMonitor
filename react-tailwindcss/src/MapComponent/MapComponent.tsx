import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import shipIcon from './icons8-cargo-ship-100.png';

const containerStyle = {
  width: '100%',
  height: '600px',
};

function MapComponent({ rows, center }: Props) {
  let map;
  return (
    <div className="md:px-20 py-8 w-full">
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_API_MAPS}>
          <GoogleMap
            onLoad={(loadedMap) => {
              map = loadedMap;
            }}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={3}
          >
            {rows.map((ship) => (
              <Marker
                key={ship.index}
                icon={shipIcon}
                label={ship.original.shipName}
                position={{ lat: ship.original.lat, lng: ship.original.lng }}
                onclick={(e) => map.panTo(e.target.position)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default React.memo(MapComponent);
