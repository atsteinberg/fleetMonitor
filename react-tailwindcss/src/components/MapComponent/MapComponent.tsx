import React, { useState } from 'react';
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import shipIcon from './vessel.png';
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

type ClickedEntry = {
  [id: string]: boolean;
};

export const MapComponent: React.FC<MapComponentProps> = ({
  rows,
  center,
}: MapComponentProps) => {
  const [selectedMarker, setSelectedMarker] = useState<Row<Ship> | null>(null);
  const [markerMap, setMarkerMap] = useState<MapEntry>({});
  const [infoOpen, setInfoOpen] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [clicked, setClicked] = useState<ClickedEntry>({});

  const markerLoadHandler = (marker: google.maps.Marker, ship: Row<Ship>) => {
    setClicked((prevState) => ({ ...prevState, [ship.id]: false }));
    return setMarkerMap((prevState) => {
      return { ...prevState, [ship.id]: marker };
    });
  };

  const markerUnmountHandler = (ship: Row<Ship>) => {
    setClicked((prevState) => ({
      ...prevState,
      [ship.id]: false,
      global: false,
    }));
  };

  const loadHandler = (loadedMap: google.maps.Map) => {
    setMap(loadedMap);
  };

  const unmountHandler = () => {
    setMap(null);
  };

  const toggleClicked = (ship: Row<Ship>) => {
    setClicked((prevState) => {
      return {
        [ship.id]: !prevState[ship.id] ? true : false,
        global: !prevState.global || !prevState[ship.id] ? true : false,
      };
    });
  };

  const markerClickHandler = (ship: Row<Ship>) => {
    toggleClicked(ship);
    showInfo(ship);
  };

  const showInfo = (ship: Row<Ship>) => {
    setSelectedMarker(ship);
    if (infoOpen) {
      setInfoOpen(false);
    }
    setInfoOpen(true);
  };

  const markerMouseOverHandler = (ship: Row<Ship>) => {
    if (!clicked.global) showInfo(ship);
  };

  const markerMouseOutHandler = (ship: Row<Ship>) => {
    if (infoOpen && !clicked[ship.id] && !clicked.global) {
      setInfoOpen(false);
    }
  };

  const handleClose = (id: string) =>
    setClicked((prevState) => {
      return {
        ...prevState,
        [id]: false,
        global: false,
      };
    });

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
                onUnmount={() => markerUnmountHandler(ship)}
                onMouseOver={() => markerMouseOverHandler(ship)}
                onMouseOut={() => markerMouseOutHandler(ship)}
                onClick={() => markerClickHandler(ship)}
                onDblClick={(event) => {
                  map?.panTo(event.latLng);
                }}
              />
            ))}
            {infoOpen && selectedMarker && (
              <InfoWindow
                anchor={markerMap[selectedMarker.id]}
                onCloseClick={() => handleClose(selectedMarker.id)}
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
