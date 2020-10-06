import { calculateFuturePositions } from '../services/mapService';
import { Positions } from '../types/apiDefs';

const voyageObject = {
  mmsi: 255806176,
  destination: 'AU PHE',
  lastPortId: '309',
  lastPortName: 'TIANJIN',
  lastPortUnlocode: 'CNTXG',
  lastPortTime: new Date('2020-09-21T00:50:00'),
  nexPortId: '282',
  nextPortName: 'PORT HEDLAND',
  nextPortUnlocode: 'AUPHE',
  eta: new Date('2020-10-05T00:00:00'),
  etaCalc: new Date('2020-10-05T00:18:00'),
  distanceTravelled: 3466,
  distanceToGo: 320,
  speedCalc: 10.8,
  draught: 67,
  draughtMax: 89,
  loadStatusName: 'PARTIALLY_LADEN',
  route: [
    {
      lat: 118.11,
      lng: -18.6056,
    },
    {
      lat: 118.447,
      lng: -19.8958,
    },
    {
      lat: 118.527,
      lng: -20.0252,
    },
    {
      lat: 118.548,
      lng: -20.0879,
    },
    {
      lat: 118.557,
      lng: -20.2228,
    },
  ],
};

describe('caculateFuturePositions', () => {
  it('should calculate some positions', () => {
    const futurePositions = calculateFuturePositions(voyageObject);
    // console.log(futurePositions);
    expect(futurePositions).toMatchObject({});
  });
});
