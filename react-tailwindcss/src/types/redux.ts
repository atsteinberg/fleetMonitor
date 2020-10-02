import { Ship } from './ShipInterface';

export const POSITION_UPDATE = 'POSITION_UPDATE';

export type Ships = Ship[];

export interface ShipsState {
  ships: Ship[];
}

export interface UpdateAction {
  type: typeof POSITION_UPDATE;
  index: number;
  lat: number;
  lng: number;
  updated: boolean;
}
