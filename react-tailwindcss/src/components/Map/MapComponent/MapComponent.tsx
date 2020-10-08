import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import {
  PointInHistory,
  Ship,
  ShipHistory,
} from '../../../types/ShipInterface';
import { Row } from 'react-table';
import { ShipMapLayer } from '../ShipMapLayer/ShipMapLayer';
import { TimeSlider } from '../TimeSlider/TimeSlider';
import { extractHistory } from './helper';
import { useSelector } from 'react-redux';
import { ShipsState } from '../../../types/redux';

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

// let history: ShipHistory = {
//   previousStates: [
//     {
//       time: Date.now() - 300000000,
//       ships: [
//         {
//           shipName: 'Zea Fame',
//           mmsi: '255806176',
//           type: '12000t 2x350t 20kn',
//           owner: 'UHL',
//           lat: 52.44043,
//           lng: 13.371147,
//           updated: 'mock',
//         },
//         {
//           shipName: 'Anne_Sofie',
//           mmsi: '218412000',
//           type: '12000t 2x350t 20kn',
//           owner: 'SAL',
//           lat: 51.44043,
//           lng: 13.371147,
//           updated: 'mock',
//         },
//       ],
//     },
//     {
//       time: Date.now() - 200000000,
//       ships: [
//         {
//           shipName: 'Zea Fame',
//           mmsi: '255806176',
//           type: '12000t 2x350t 20kn',
//           owner: 'UHL',
//           lat: 52.44043,
//           lng: 13.371147,
//           updated: 'mock',
//         },
//         {
//           shipName: 'Anne_Sofie',
//           mmsi: '218412000',
//           type: '12000t 2x350t 20kn',
//           owner: 'SAL',
//           lat: 51.44043,
//           lng: 13.371147,
//           updated: 'mock',
//         },
//       ],
//     },
//     {
//       time: Date.now() - 20000000,
//       ships: [
//         {
//           shipName: 'Zea Fame',
//           mmsi: '255806176',
//           type: '12000t 2x350t 20kn',
//           owner: 'UHL',
//           lat: 53.44043,
//           lng: 14.371147,
//           updated: 'mock',
//         },
//         {
//           shipName: 'Anne_Sofie',
//           mmsi: '218412000',
//           type: '12000t 2x350t 20kn',
//           owner: 'SAL',
//           lat: 51.44043,
//           lng: 10.371147,
//           updated: 'mock',
//         },
//       ],
//     },
//   ],
//   futureStates: [
//     {
//       time: Date.now() + 1000000,
//       ships: [
//         {
//           shipName: 'Zea Fame',
//           mmsi: '255806176',
//           type: '12000t 2x350t 20kn',
//           owner: 'UHL',
//           lat: 50.44043,
//           lng: 12.371147,
//           updated: 'mock',
//         },
//         {
//           shipName: 'Anne_Sofie',
//           mmsi: '218412000',
//           type: '12000t 2x350t 20kn',
//           owner: 'SAL',
//           lat: 42.44043,
//           lng: 13.371147,
//           updated: 'mock',
//         },
//       ],
//     },
//   ],
// };

export const MapComponent: React.FC<MapComponentProps> = ({
  rows,
  center,
}: MapComponentProps) => {
  // const [history, setHistory] = useState(extractHistory(rows));

  const history: ShipHistory = useSelector(
    (state: ShipsState) => state.history,
  );

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [pointInHistory, setPointInHistory] = useState<PointInHistory>();

  const loadHandler = (loadedMap: google.maps.Map) => {
    setMap(loadedMap);
  };

  const unmountHandler = () => {
    setMap(null);
  };

  return (
    <div className="p-20 py-8 w-full">
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_API_MAPS}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={3}
            onLoad={loadHandler}
            onUnmount={unmountHandler}
          >
            <ShipMapLayer map={map} ships={pointInHistory?.ships || []} />
          </GoogleMap>
        </LoadScript>
      </div>
      <TimeSlider setPointInHistory={setPointInHistory} history={history} />
    </div>
  );
};

export default React.memo(MapComponent);
