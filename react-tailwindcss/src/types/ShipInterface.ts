export interface Ship {
  shipName: string;
  mmsi: string;
  type: string;
  owner: string;
  lat: number;
  lng: number;
  updated: boolean | string | number;
  history?: IndividualHistory;
}

interface IndividualPointInHistory {
  time: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface IndividualHistory {
  previousLocations: IndividualPointInHistory[];
  futureLocations: IndividualPointInHistory[];
}

export interface PointInHistory {
  time: number;
  ships: Ship[];
}

export interface ShipHistory {
  previousStates: PointInHistory[];
  futureStates: PointInHistory[];
}
