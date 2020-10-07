import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
// import shipIcon from './ship.png';
import { Ship } from '../../types/ShipInterface';
import { Row } from 'react-table';

// for testing purposes
import { Route } from '../Route/Route';
import { calculateFuturePositions } from '../../services/routeService';
const data2 = [
  '255806176',
  'AU PHE',
  '309',
  'TIANJIN',
  'CNTXG',
  '2020-09-21T00:50:00',
  '282',
  'PORT HEDLAND',
  'AUPHE',
  '2020-10-05T00:00:00',
  '2020-10-05T00:18:00',
  '3466',
  '320',
  '108',
  '67',
  '89',
  'PARTIALLY_LADEN',
  'LINESTRING (118.11 -18.60560, 118.447 -19.8958, 118.527 -20.0252, 118.548 -20.0879, 118.557 -20.2228)',
];

const data = [
  '218522000',
  'SG SIN PEBGA',
  '17428',
  'LUSHUN',
  'CNLSH',
  '2020-10-03T07:17:00',
  '290',
  'SINGAPORE',
  'SGSIN',
  '2020-10-10T01:00:00',
  '2020-10-09T17:48:00',
  '112',
  '2612',
  '176',
  '68',
  '82',
  'PARTIALLY_LADEN',
  'LINESTRING (122.66 37.8804, 123.416 37.2, 123.945 36.0785, 124.049 33.6554, 123.998 29.8453, 122.888 26.4035, 121.734 22.8079, 120.055 20.6084, 118.031 18.3973, 115.398 15.4072, 113.176 12.6598, 110.939 10.441, 109.478 8.5784, 105.207 3.0686, 104.592 1.5568, 104.321 1.3099, 104.158 1.2871, 103.997 1.2608, 103.841 1.1935)',
];
const voyage = new VoyageInfo(data);
const route = voyage.route;
console.log(voyage);
// enrich route with port info

const destinationPort = {
  lat: -20.3165,
  lng: 118.576,
};
const startPort = {
  lat: 38.96904,
  lng: 117.73725,
};
// route.push(destinationPort);
// route.unshift(startPort);

// end test stuff

import bbcIcon from './bbcicon.png';
import belugaIcon from './belugaicon.png';
import salIcon from './salicon.png';
import uhlIcon from './uhlicon.png';
import { VoyageInfo } from '../../types/apiDefs';

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
  const [positions, setPositions] = useState({});

  useEffect(() => {
    setPositions(calculateFuturePositions(voyage));
    console.log(calculateFuturePositions(voyage));
  }, []);

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
                icon={
                  ship.original.owner == 'BBC'
                    ? bbcIcon
                    : ship.original.owner == 'Beluga'
                    ? belugaIcon
                    : ship.original.owner == 'SAL'
                    ? salIcon
                    : uhlIcon
                }
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
                  <h1>Name: {selectedMarker.original.shipName}</h1>
                  <p>Owner: {selectedMarker.original.owner}</p>
                  <p>Type: {selectedMarker.original.type}</p>
                  <p>MMSI: {selectedMarker.original.mmsi}</p>
                </div>
              </InfoWindow>
            )}
            <Route route={positions} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default React.memo(MapComponent);
