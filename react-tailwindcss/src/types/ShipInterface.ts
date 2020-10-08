export interface Ship {
  shipName: string;
  mmsi: string;
  type: string;
  owner: string;
  lat: number;
  lng: number;
  updated: boolean | string;
  history?: ShipHistory;
}

export interface PointInHistory {
  time: number;
  ships: Ship[];
}

export interface ShipHistory {
  previousStates: PointInHistory[];
  futureStates: PointInHistory[];
}
