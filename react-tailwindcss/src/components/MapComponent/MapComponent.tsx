import React, { useState } from 'react';
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import shipIcon from './icons8-cargo-ship-100.png';
import { Ship } from '../../types/ShipInterface';
import { Row } from 'react-table';

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

interface MapEntry {
  [id: string]: google.maps.Marker;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  rows,
  center,
}: MapComponentProps) => {
  const [selectedMarker, setSelectedMarker] = useState<Row<Ship> | null>(null);
  const [markerMap, setMarkerMap] = useState<MapEntry>({});
  const [infoOpen, setInfoOpen] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const markerLoadHandler = (marker: google.maps.Marker, ship: Row<Ship>) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [ship.id]: marker };
    });
  };

  const loadHandler = (loadedMap: google.maps.Map) => {
    setMap(loadedMap);
  };

  const unmountHandler = () => {
    setMap(null);
  };

  const markerClickHandler = (
    event: google.maps.MouseEvent,
    ship: Row<Ship>,
  ) => {
    setSelectedMarker(ship);
    if (infoOpen) {
      setInfoOpen(false);
    }
    setInfoOpen(true);
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
            {rows.map((ship) => (
              <Marker
                key={ship.index}
                icon={shipIcon}
                label={ship.original.shipName}
                position={{ lat: ship.original.lat, lng: ship.original.lng }}
                onLoad={(marker) => markerLoadHandler(marker, ship)}
                onClick={(event) => markerClickHandler(event, ship)}
                onDblClick={(event) => {
                  map?.panTo(event.latLng);
                }}
              />
            ))}
            {infoOpen && selectedMarker && (
              <InfoWindow
                anchor={markerMap[selectedMarker.id]}
                onCloseClick={() => setInfoOpen(false)}
              >
                <div>
                  <h1>{selectedMarker.original.shipName}</h1>
                  <p>Owner: {selectedMarker.original.owner}</p>
                  <p>Type: {selectedMarker.original.type}</p>
                  <p>MMSI: {selectedMarker.original.mmsi}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default React.memo(MapComponent);
