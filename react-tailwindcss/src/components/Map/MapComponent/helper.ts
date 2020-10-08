import { Row } from 'react-table';
import { Ship, ShipHistory } from '../../../types/ShipInterface';

export const extractHistory = (rows: Row<Ship>[]): ShipHistory => {
  const history: ShipHistory = {
    previousStates: [],
    futureStates: [],
  };
  return history;
};
