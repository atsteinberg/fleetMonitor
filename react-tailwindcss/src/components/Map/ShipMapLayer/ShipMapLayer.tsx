import { InfoWindow } from '@react-google-maps/api';
import React, { useState } from 'react';
import { Ship } from '../../../types/ShipInterface';
import { ShipMarker } from '../ShipMarker/ShipMarker';

export interface MapEntry {
  [id: string]: google.maps.Marker;
}

export interface ClickedEntry {
  [id: string]: boolean;
}

interface ShipMapLayerProps {
  ships: Ship[];
  map: google.maps.Map | null;
}

export const ShipMapLayer: React.FC<ShipMapLayerProps> = ({
  ships,
  map,
}: ShipMapLayerProps) => {
  const handleClose = (id: string) => {
    setClicked((prevState) => {
      return {
        ...prevState,
        [id]: false,
        global: false,
      };
    });
  };
  const [selectedMarker, setSelectedMarker] = useState<Ship | null>(null);
  const [markerMap, setMarkerMap] = useState<MapEntry>({});
  const [infoOpen, setInfoOpen] = useState(false);
  const [clicked, setClicked] = useState<ClickedEntry>({});
  const shipsMarker = ships.map((ship) => (
    <ShipMarker
      key={ship.mmsi}
      ship={ship}
      setClicked={setClicked}
      setMarkerMap={setMarkerMap}
      setSelectedMarker={setSelectedMarker}
      infoOpen={infoOpen}
      setInfoOpen={setInfoOpen}
      clicked={clicked}
      map={map}
    />
  ));

  const infoWindow = infoOpen && selectedMarker && (
    <InfoWindow
      anchor={markerMap[selectedMarker.mmsi]}
      onCloseClick={() => handleClose(selectedMarker.mmsi)}
    >
      <div>
        <h1>Name: {selectedMarker.shipName}</h1>
        <p>Owner: {selectedMarker.owner}</p>
        <p>Type: {selectedMarker.type}</p>
        <p>MMSI: {selectedMarker.mmsi}</p>
      </div>
    </InfoWindow>
  );

  return (
    <>
      {shipsMarker}
      {infoWindow}
    </>
  );
};
