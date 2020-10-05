export interface Positions {
  [time: string]: {
    time: Date;
    lat: number;
    lng: number;
  };
}

interface LatLng {
  lat: number;
  lng: number;
}

export class VoyageInfo {
  mmsi: number;
  destination: string;
  lastPortId: string;
  lastPortName: string;
  lastPortUnlocode: string;
  lastPortTime: Date;
  nexPortId: string;
  nextPortName: string;
  nextPortUnlocode: string;
  eta: Date;
  etaCalc: Date;
  distanceTravelled: number;
  distanceToGo: number;
  speedCalc: number;
  draught: number;
  draughtMax: number;
  loadStatusName: string;
  route: LatLng[];

  constructor([
    mmsi,
    destination,
    lastPortId,
    lastPortName,
    lastPortUnlocode,
    lastPortTime,
    nexPortId,
    nextPortName,
    nextPortUnlocode,
    eta,
    etaCalc,
    distanceTravelled,
    distanceToGo,
    speedCalc,
    draught,
    draughtMax,
    loadStatusName,
    route,
  ]: string[]) {
    this.mmsi = parseInt(mmsi);
    this.destination = destination;
    this.lastPortId = lastPortId;
    this.lastPortName = lastPortName;
    this.lastPortUnlocode = lastPortUnlocode;
    this.lastPortTime = new Date(lastPortTime);
    this.nexPortId = nexPortId;
    this.nextPortName = nextPortName;
    this.nextPortUnlocode = nextPortUnlocode;
    this.eta = new Date(eta);
    this.etaCalc = new Date(etaCalc);
    this.distanceTravelled = parseInt(distanceTravelled);
    this.distanceToGo = parseInt(distanceToGo);
    this.speedCalc = parseInt(speedCalc);
    this.draught = parseInt(draught);
    this.draughtMax = parseInt(draughtMax);
    this.loadStatusName = loadStatusName;
    this.route = this.parse(route);
  }

  parse(route: string): LatLng[] {
    const segments = [];
    const trimmedRoute = route.match(/^LINESTRING \((\.*)\)$/);
    const segmentStrings =
      trimmedRoute && trimmedRoute.length > 1 ? trimmedRoute[1].split(',') : [];

    for (const segment of segmentStrings) {
      const [lat, lng] = segment.split(' ');
      segments.push({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
    return segments;
  }
}
