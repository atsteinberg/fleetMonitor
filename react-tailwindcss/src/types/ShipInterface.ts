export interface Ship {
  shipName: string;
  mmsi: string;
  type: string;
  owner: string;
  lat: number;
  lng: number;
  updated: boolean | string;
}
