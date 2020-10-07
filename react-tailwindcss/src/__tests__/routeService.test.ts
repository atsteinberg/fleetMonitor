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

const plottedInitialRoute = {
  1601857080000: {
    lat: -20.3165,
    lng: 118.576,
  },
  1601853480000: {
    lat: -20.1386,
    lng: 118.5514,
  },
  1601849880000: {
    lat: -19.97,
    lng: 118.4928,
  },
  1601846280000: {
    lat: -19.8042,
    lng: 118.4228,
  },
  1601842680000: {
    lat: -19.6295,
    lng: 118.377,
  },
  1601839080000: {
    lat: -19.45,
    lng: 118.3311,
  },
  1601835480000: {
    lat: -19.2803,
    lng: 118.286,
  },
};

function approximate(positions: Positions): Positions {
  const approximatePositions: Positions = {};
  const keys = Object.keys(positions);
  for (const key of keys) {
    approximatePositions[key] = {
      lat: Math.floor(positions[key].lat * 10),
      lng: Math.floor(positions[key].lng * 10),
    };
  }
  return approximatePositions;
}

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
  it('should interpolate approximately correct waypoints', () => {
    const approximateFuturePositions = approximate(
      calculateFuturePositions(voyage),
    );
    const approximatePlottedRoute = approximate(plottedInitialRoute);
    expect(approximateFuturePositions).toMatchObject(approximatePlottedRoute);
  });
});
