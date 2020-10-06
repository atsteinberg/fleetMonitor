import { calculateFuturePositions } from '../services/mapService';
import { Positions, VoyageInfo } from '../types/apiDefs';

import { mocks } from '../../__mocks__/@fleetSpy/transmarine';
const voyage = new VoyageInfo(mocks.vi01[0]);
const route = voyage.route;

describe('caculateFuturePositions', () => {
  it('should calculate some positions', () => {
    const futurePositions = calculateFuturePositions(voyage);
    console.log(futurePositions);
    expect(futurePositions).toMatchObject({});
  });
});
