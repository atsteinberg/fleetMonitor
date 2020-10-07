export interface Ship {
  shipName: string;
  mmsi: string;
  type: string;
  owner: string;
  lat: number;
  lng: number;
  updated: boolean | string;
}

export interface PointInHistory {
  time: number;
  ships: Ship[];
}

export interface History {
  previousStates: PointInHistory[];
  futureStates: PointInHistory[];
}
