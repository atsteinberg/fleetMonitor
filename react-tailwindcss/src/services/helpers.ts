// all of these are lifted from https://www.movable-type.co.uk/scripts/latlong.html
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

export function calculateBearing(
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
  return θ;
  // return ((θ * 180) / Math.PI + 360) % 360; // in degrees
}

export function calculateNextPoint(
  // expects current and target coordinate in signed degs and distance in km
  current: { lat: number; lng: number },
  target: { lat: number; lng: number },
  distance: number,
): LatLng {
  const d = distance * 1e3;
  const brng = calculateBearing(current, target);
  const R = 6371e3;
  const φ1 = (current.lat / 180) * Math.PI;
  const λ1 = (current.lng * Math.PI) / 180;
  const φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(d / R) +
      Math.cos(φ1) * Math.sin(d / R) * Math.cos(brng),
  );
  const λ2 =
    λ1 +
    Math.atan2(
      Math.sin(brng) * Math.sin(d / R) * Math.cos(φ1),
      Math.cos(d / R) - Math.sin(φ1) * Math.sin(φ2),
    );
  return {
    lat: (φ2 * 180) / Math.PI,
    lng: (λ2 * 180) / Math.PI,
  };
}
