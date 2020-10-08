import { Marker } from '@react-google-maps/api';
import React, { Dispatch, SetStateAction } from 'react';
import { ShipTimeslice } from '../../../types/Ship';
import { ClickedEntry, MapEntry } from '../ShipMapLayer/ShipMapLayer';

interface ShipMarkerProps {
  map: google.maps.Map | null;
  ship: ShipTimeslice;
  setClicked: Dispatch<SetStateAction<ClickedEntry>>;
  clicked: ClickedEntry;
  setMarkerMap: Dispatch<SetStateAction<MapEntry>>;
  setSelectedMarker: Dispatch<SetStateAction<ShipTimeslice | null>>;
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
  const markerLoadHandler = (
    marker: google.maps.Marker,
    ship: ShipTimeslice,
  ) => {
    setClicked((prevState: ClickedEntry) => ({
      ...prevState,
      [ship.mmsi]: false,
    }));
    return setMarkerMap((prevState: MapEntry) => {
      return { ...prevState, [ship.mmsi]: marker };
    });
  };

  const markerUnmountHandler = (ship: ShipTimeslice) => {
    setClicked((prevState: ClickedEntry) => ({
      ...prevState,
      [ship.mmsi]: false,
      global: false,
    }));
  };

  const toggleClicked = (ship: ShipTimeslice) => {
    setClicked((prevState: ClickedEntry) => {
      return {
        [ship.mmsi]: !prevState[ship.mmsi] ? true : false,
        global: !prevState.global || !prevState[ship.mmsi] ? true : false,
      };
    });
  };

  const markerClickHandler = (ship: ShipTimeslice) => {
    toggleClicked(ship);
    showInfo(ship);
  };

  const showInfo = (ship: ShipTimeslice) => {
    setSelectedMarker(ship);
    if (infoOpen) {
      setInfoOpen(false);
    }
    setInfoOpen(true);
  };

  const markerMouseOverHandler = (ship: ShipTimeslice) => {
    if (!clicked.global) showInfo(ship);
  };

  const markerMouseOutHandler = (ship: ShipTimeslice) => {
    if (infoOpen && !clicked[ship.mmsi] && !clicked.global) {
      setInfoOpen(false);
    }
  };
  console.log(ship);
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
      position={{
        lat: ship.location.coordinates.lat,
        lng: ship.location.coordinates.lng,
      }}
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
