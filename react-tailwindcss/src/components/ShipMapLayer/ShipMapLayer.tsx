import { InfoWindow, Marker } from '@react-google-maps/api';
import React, { useState } from 'react';
import { Row } from 'react-table';
import { Ship } from '../../types/ShipInterface';

import bbcIcon from '../../assets/bbcicon.png';
import belugaIcon from '../../assets/belugaicon.png';
import salIcon from '../../assets/salicon.png';
import uhlIcon from '../../assets/uhlicon.png';

interface MapEntry {
  [id: string]: google.maps.Marker;
}

type ClickedEntry = {
  [id: string]: boolean;
};

interface ShipMapLayerProps {
  ships: Row<Ship>[];
  map: google.maps.Map | null;
}

export const ShipMapLayer: React.FC<ShipMapLayerProps> = ({
  ships,
  map,
}: ShipMapLayerProps) => {
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

  const handleClose = (id: string) => {
    setClicked((prevState) => {
      return {
        ...prevState,
        [id]: false,
        global: false,
      };
    });
  };
  const [selectedMarker, setSelectedMarker] = useState<Row<Ship> | null>(null);
  const [markerMap, setMarkerMap] = useState<MapEntry>({});
  const [infoOpen, setInfoOpen] = useState(false);
  const [clicked, setClicked] = useState<ClickedEntry>({});
  const shipsMarker = ships.map((ship) => (
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
  ));

  const infoWindow = infoOpen && selectedMarker && (
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
  );

  return (
    <>
      {shipsMarker}
      {infoWindow}
    </>
  );
};
