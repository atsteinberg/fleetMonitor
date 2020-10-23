import { VoyageInfo } from '../types/apiDefs';
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
    lng: 118.11,
    lat: -18.6056,
  },
  {
    lng: 118.447,
    lat: -19.8958,
  },
  {
    lng: 118.527,
    lat: -20.0252,
  },
  {
    lng: 118.548,
    lat: -20.0879,
  },
  {
    lng: 118.557,
    lat: -20.2228,
  },
];

const voyageObject = {
  mmsi: 255806176,
  destination: 'AU PHE',
  lastPortId: '309',
  lastPortName: 'TIANJIN',
  lastPortUnlocode: 'CNTXG',
  lastPortTime: new Date('2020-09-21T00:50:00Z'),
  nexPortId: '282',
  nextPortName: 'PORT HEDLAND',
  nextPortUnlocode: 'AUPHE',
  eta: new Date('2020-10-05T00:00:00Z'),
  etaCalc: new Date('2020-10-05T00:18:00Z'),
  distanceTravelled: 3466 * 1.852,
  distanceToGo: 320 * 1.852,
  speedCalc: 10.8 * 1.852,
  draught: 67,
  draughtMax: 89,
  loadStatusName: 'PARTIALLY_LADEN',
  route: [
    {
      lng: 118.11,
      lat: -18.6056,
    },
    {
      lng: 118.447,
      lat: -19.8958,
    },
    {
      lng: 118.527,
      lat: -20.0252,
    },
    {
      lng: 118.548,
      lat: -20.0879,
    },
    {
      lng: 118.557,
      lat: -20.2228,
    },
  ],
};

describe('constructor', () => {
  it('should create new voyage object instance from array', () => {
    const myVoyage = new VoyageInfo(voyage);
    expect(myVoyage).toBeInstanceOf(VoyageInfo);
    expect(myVoyage).toMatchObject(voyageObject);
  });
});

describe('parse', () => {
  it('should parse a linestring to an array of LatLngs', () => {
    const myRoute = VoyageInfo.parse(routeString);
    expect(myRoute).toStrictEqual(route);
  });
});
// TODO: check that routes are parsed correctly (mapping lats to lat and lngs to lat)
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';
describe('App', () => {
    test('renders App component', () => {
        render(<App />);
        screen.getByText('React Example');
    });
});
