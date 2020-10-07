import {
  calculateDistance,
  calculateBearing,
  calculateNextPoint,
} from '../services/helpers';
import { LatLng, VoyageInfo } from '../types/apiDefs';

import { mocks } from '../../__mocks__/@fleetSpy/transmarine';

const voyage = new VoyageInfo(mocks.vi01[0]);
const route = voyage.route;
const c1 = route[0];
const c2 = route[1];
const c3 = route[2];
const dist1 = 147.8;
const bearing1 = (166 + 12 / 60 + 10 / 3600) * (Math.PI / 180);
const bearing2 = (-31 - 10 / 60 - 28 / 3600) * (Math.PI / 180);

const c4 = {
  lat: -20.2228,
  lng: 118.557,
};
const c5 = {
  lat: -20.0879,
  lng: 118.548,
};

function approximateCoordinate(coordinate: LatLng): LatLng {
  const c = { lat: 0, lng: 0 };
  c.lat = Math.round(coordinate.lat * 100);
  c.lng = Math.round(coordinate.lng * 100);
  return c;
}

describe('calculateDistance', () => {
  it('should return a number', () => {
    expect(typeof calculateDistance(c1, c2)).toBe('number');
  });
  it('should return 0 for same coordinate', () => {
    expect(calculateDistance(c1, c1)).toBe(0);
  });
  it('should be non-negative', () => {
    expect(calculateDistance(c3, c1)).toBeGreaterThanOrEqual(0);
  });
  it('should be symmetric', () => {
    expect(calculateDistance(c1, c2)).toBe(calculateDistance(c2, c1));
  });
  it('should calculate the shortest path between two coordinates', () => {
    expect(calculateDistance(c1, c3)).toBeLessThanOrEqual(
      calculateDistance(c1, c2) + calculateDistance(c2, c3),
    );
  });
  it('should return the correct distance between different coordinates', () => {
    expect(calculateDistance(c1, c2)).toBeGreaterThan(dist1 - 1);
    expect(calculateDistance(c1, c2)).toBeLessThan(dist1 + 1);
  });
});

describe('calculateBearing', () => {
  it('should return a number', () => {
    expect(typeof calculateBearing(c1, c2)).toBe('number');
  });
  it('should return 0 for same coordinate', () => {
    expect(calculateBearing(c1, c1)).toBe(0);
  });
  it('should return the correct bearing for different coordinates', () => {
    expect(calculateBearing(c1, c2)).toBeGreaterThan(bearing1 - 1);
    expect(calculateBearing(c1, c2)).toBeLessThan(bearing1 + 1);
    expect(calculateBearing(c3, c2)).toBeGreaterThan(bearing2 - 1);
    expect(calculateBearing(c3, c2)).toBeLessThan(bearing2 + 1);
  });
});

describe('calculateNextPoint', () => {
  it('should return a coordinate', () => {
    expect(calculateNextPoint(c1, c2, 0)).toHaveProperty('lat');
    expect(calculateNextPoint(c1, c1, 0)).toHaveProperty('lng');
  });
  it('should return approximately the start coordinate if applied with distance 0', () => {
    const calculated = calculateNextPoint(c1, c1, 0);
    expect(Math.floor(calculated.lat * 100)).toBe(Math.floor(c1.lat * 100));
    expect(Math.floor(calculated.lng * 100)).toBe(Math.floor(c1.lng * 100));
  });
  it('should return approximately the end coordinate if applied with the distance from start to end', () => {
    const calculated = calculateNextPoint(c1, c2, calculateDistance(c1, c2));
    // expect(Math.round(calculated.lat * 10)).toBeGreaterThanOrEqual(
    //   Math.round(c2.lat * 10) - 1,
    // );
    // expect(Math.round(calculated.lat * 10)).toBeLessThanOrEqual(
    //   Math.round(c2.lat * 10) + 1,
    // );
    // expect(Math.round(calculated.lng * 10)).toBeGreaterThanOrEqual(
    //   Math.round(c2.lng * 10) - 1,
    // );
    // expect(Math.round(calculated.lng * 10)).toBeLessThanOrEqual(
    //   Math.round(c2.lng * 10) + 1,
    // );
    expect(approximateCoordinate(calculated)).toMatchObject(
      approximateCoordinate(c2),
    );
  });
  it('should calculate approximate actual results', () => {
    const calculatedFirstWaypoint = calculateNextPoint(c4, c5, 9.4);
    const actualFirstWaypoint = {
      lat: -20.1383,
      lng: 118.5514,
    };
    expect(approximateCoordinate(calculatedFirstWaypoint)).toMatchObject(
      approximateCoordinate(actualFirstWaypoint),
    );
  });
});
