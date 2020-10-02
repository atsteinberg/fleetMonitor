import React from 'react';
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import shipIcon from './icons8-cargo-ship-100.png';
import { Ships } from '../../types/redux';
import { Ship } from '../../types/ShipInterface';

const containerStyle = {
  width: '100%',
  height: '600px',
};

type Center = {
  lat: number;
  lng: number;
};

type Row = {
  index: number;
  original: Ship;
  values: Ship;
};

type MapComponentProps = {
  rows: Row[];
  center: Center;
};

export const MapComponent: React.FC<MapComponentProps> = ({ rows, center }) => {
  console.log(rows);

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
                onClick={(e) => {
                  map.panTo({ lat: ship.original.lat, lng: ship.original.lng });
                  map.setZoom(6);
                }}
              >
                <InfoWindow key={ship.index}>
                  <div>
                    <p>Name: {ship.original.shipName}</p>
                    <p>Owner: {ship.original.owner}</p>
                    <p>Type: {ship.original.type}</p>
                    <p>MMSI: {ship.original.mmsi}</p>
                  </div>
                </InfoWindow>
              </Marker>
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default React.memo(MapComponent);
