import { Marker } from '@react-google-maps/api';
import React, { Dispatch, SetStateAction } from 'react';
import { Ship } from '../../../types/ShipInterface';
import { ClickedEntry, MapEntry } from '../ShipMapLayer/ShipMapLayer';

interface ShipMarkerProps {
  map: google.maps.Map | null;
  ship: Ship;
  setClicked: Dispatch<SetStateAction<ClickedEntry>>;
  clicked: ClickedEntry;
  setMarkerMap: Dispatch<SetStateAction<MapEntry>>;
  setSelectedMarker: Dispatch<SetStateAction<Ship | null>>;
  infoOpen: boolean;
  setInfoOpen: Dispatch<SetStateAction<boolean>>;
}

export const ShipMarker: React.FC<ShipMarkerProps> = ({
  ship,
  setClicked,
  setMarkerMap,
  setSelectedMarker,
  infoOpen,
  setInfoOpen,
  clicked,
  map,
}: ShipMarkerProps) => {
  const markerLoadHandler = (marker: google.maps.Marker, ship: Ship) => {
    setClicked((prevState: ClickedEntry) => ({
      ...prevState,
      [ship.mmsi]: false,
    }));
    return setMarkerMap((prevState: MapEntry) => {
      return { ...prevState, [ship.mmsi]: marker };
    });
  };

  const markerUnmountHandler = (ship: Ship) => {
    setClicked((prevState: ClickedEntry) => ({
      ...prevState,
      [ship.mmsi]: false,
      global: false,
    }));
  };

  const toggleClicked = (ship: Ship) => {
    setClicked((prevState: ClickedEntry) => {
      return {
        [ship.mmsi]: !prevState[ship.mmsi] ? true : false,
        global: !prevState.global || !prevState[ship.mmsi] ? true : false,
      };
    });
  };

  const markerClickHandler = (ship: Ship) => {
    toggleClicked(ship);
    showInfo(ship);
  };

  const showInfo = (ship: Ship) => {
    setSelectedMarker(ship);
    if (infoOpen) {
      setInfoOpen(false);
    }
    setInfoOpen(true);
  };

  const markerMouseOverHandler = (ship: Ship) => {
    if (!clicked.global) showInfo(ship);
  };

  const markerMouseOutHandler = (ship: Ship) => {
    if (infoOpen && !clicked[ship.mmsi] && !clicked.global) {
      setInfoOpen(false);
    }
  };
  const iconPath =
    ship.owner === 'BBC'
      ? 'assets/bbcicon.png'
      : ship.owner === 'Beluga'
      ? 'assets/belugaicon.png'
      : ship.owner === 'SAL'
      ? 'assets/salicon.png'
      : 'assets/uhlicon.png';
  return (
    <Marker
      icon={iconPath}
      position={{ lat: ship.lat, lng: ship.lng }}
      onLoad={(marker) => markerLoadHandler(marker, ship)}
      onUnmount={() => markerUnmountHandler(ship)}
      onMouseOver={() => markerMouseOverHandler(ship)}
      onMouseOut={() => markerMouseOutHandler(ship)}
      onClick={() => markerClickHandler(ship)}
      onDblClick={(event) => {
        map?.panTo(event.latLng);
      }}
    />
  );
};
