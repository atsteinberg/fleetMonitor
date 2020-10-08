export interface Ship {
  name: string;
  mmsi: string;
  type: string;
  owner: string;
  locations: LocationHistory;
}

export interface PointInHistory {
  time: number;
  ships: ShipTimeslice[];
}

export interface ShipHistory {
  previousStates: PointInHistory[];
  futureStates: PointInHistory[];
}

export interface LocationHistory {
  previousLocations: DatedLocation[];
  futureLocations: DatedLocation[];
}

export interface DatedLocation {
  time: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  updated_at: number;
}

export interface ShipTimeslice {
  name: string;
  mmsi: string;
  type: string;
  owner: string;
  location: {
    time: number;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}
