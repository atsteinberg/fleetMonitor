import { VoyageInfo } from '../apiDefs';
const voyage = [
  '255806176',
  'AU PHE',
  '309',
  'TIANJIN',
  'CNTXG',
  '2020-09-21T00:50:00',
  '282',
  'PORT HEDLAND',
  'AUPHE',
  '2020-10-05T00:00:00',
  '2020-10-05T00:18:00',
  '3466',
  '320',
  '108',
  '67',
  '89',
  'PARTIALLY_LADEN',
  'LINESTRING (118.11 -18.6056, 118.447 -19.8958, 118.527 -20.0252, 118.548 -20.0879, 118.557 -20.2228)',
];

const routeString =
  'LINESTRING (118.11 -18.6056, 118.447 -19.8958, 118.527 -20.0252, 118.548 -20.0879, 118.557 -20.2228)';

const route = [
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
];

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

describe('constructor', () => {
  it('should create new voyage object instance from array', () => {
    const myVoyage = new VoyageInfo(voyage);
    expect(myVoyage).toMatchObject(voyageObject);
  });
});

describe('parse', () => {
  it('should parse a linestring to an array of LatLngs', () => {
    const myRoute = VoyageInfo.parse(routeString);
    expect(myRoute).toStrictEqual(route);
  });
});
