// all of these are taken from https://www.movable-type.co.uk/scripts/latlong.html
import { LatLng } from '../types/apiDefs';

export function calculateDistance(
  pos1: { lat: number; lng: number },
  pos2: {
    lat: number;
    lng: number;
  },
): number {
  const φ1 = (pos1.lat * Math.PI) / 180;
  const φ2 = (pos2.lat * Math.PI) / 180;
  const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;
  const R = 6371e3;
  const d =
    Math.acos(
      Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ),
    ) * R;
  //return d / 1852;
  return d / 1000;
}

function calculateBearing(
  pos1: { lat: number; lng: number },
  pos2: {
    lat: number;
    lng: number;
  },
): number {
  const φ1 = (pos1.lat * Math.PI) / 180;
  const φ2 = (pos2.lat * Math.PI) / 180;
  const λ1 = (pos1.lng * Math.PI) / 180;
  const λ2 = (pos2.lng * Math.PI) / 180;

  const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
  const θ = Math.atan2(y, x);
  return ((θ * 180) / Math.PI + 360) % 360; // in degrees
}

export function calculateNextPoint(
  previous: { lat: number; lng: number },
  wayPoint: { lat: number; lng: number },
  distance: number,
): LatLng {
  const brng = calculateBearing(previous, wayPoint);
  const R = 6371e3;
  const φ1 = (previous.lat * Math.PI) / 180;
  const λ1 = (previous.lng * Math.PI) / 180;
  const φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(distance / R) +
      Math.cos(φ1) * Math.sin(distance / R) * Math.cos(brng),
  );
  const λ2 =
    λ1 +
    Math.atan2(
      Math.sin(brng) * Math.sin(distance / R) * Math.cos(φ1),
      Math.cos(distance / R) - Math.sin(φ1) * Math.sin(φ2),
    );
  return {
    lat: λ1,
    lng: λ2,
  };
}
