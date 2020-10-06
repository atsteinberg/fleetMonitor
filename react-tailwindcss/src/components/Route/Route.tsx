import { InfoWindow, Marker } from '@react-google-maps/api';
import React from 'react';
import { Positions } from '../../types/apiDefs';

interface RouteProps {
  route: Positions;
}

// eslint-disable-next-line react/prop-types
export const Route: React.FC<RouteProps> = ({ route }) => {
  const markerPlot = Object.values(route).map((pos) => {
    console.log(pos);
    return (
      <>
        <Marker
          position={{ lat: pos.lat, lng: pos.lng }}
          key={pos.stepNr}
          label={pos.stepNr.toString()}
        />
      </>
    );
  });

  return <>{markerPlot}</>;
};
