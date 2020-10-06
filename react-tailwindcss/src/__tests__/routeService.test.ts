import { calculateFuturePositions } from '../services/routeService';
import { Positions, VoyageInfo } from '../types/apiDefs';

import { mocks } from '../../__mocks__/@fleetSpy/transmarine';
const voyage = new VoyageInfo(mocks.vi01[0]);
const route = voyage.route;
// enrich route with port info

const destinationPort = {
  lat: -20.3165,
  lng: 118.576,
};
const startPort = {
  lat: 38.96904,
  lng: 117.73725,
};
route.push(destinationPort);
route.unshift(startPort);

describe('caculateFuturePositions', () => {
  it('should calculate some positions', () => {
    const futurePositions = calculateFuturePositions(voyage);
    expect(futurePositions).toMatchObject({});
    expect(Object.keys(futurePositions).length).toBeGreaterThan(10);
  });
  it('should return an object with a calculated arrival position', () => {
    const futurePositions = calculateFuturePositions(voyage);
    expect(futurePositions).toHaveProperty(voyage.etaCalc.getTime().toString());
    expect(futurePositions[voyage.etaCalc.getTime()]).toMatchObject(
      destinationPort,
    );
  });
});
