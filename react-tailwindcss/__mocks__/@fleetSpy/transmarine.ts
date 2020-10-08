import { readFileSync } from 'fs';
import { act } from '@testing-library/react';

const _ships = [
  {
    name: 'Zea Fame',
    mmsi: 255806176,
    type: '12000t 2x350t 20kn',
    owner: 'UHL',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 52.44043,
            lng: 13.371147,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Anne_Sofie',
    mmsi: 218412000,
    type: '12000t 2x350t 20kn',
    owner: 'SAL',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 52.44043,
            lng: 13.371147,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Regine',
    mmsi: 218170000,
    type: '12000t 2x350t 20kn',
    owner: 'SAL',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 51.497654,
            lng: -0.12301,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Trina',
    mmsi: 218705000,
    type: '12000t 2x350t 20kn',
    owner: 'SAL',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 41.377964,
            lng: 2.19258,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Frauke',
    mmsi: 305164000,
    type: '12000t 2x350t 20kn',
    owner: 'UHL',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.427599,
            lng: 3.975018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Maria',
    mmsi: 218522000,
    type: '9000t 2x350t 20kn',
    owner: 'BBC',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.57599,
            lng: 3.975018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Annette',
    mmsi: 304577000,
    type: '9000t 2x350t 20kn',
    owner: 'BBC',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.6599,
            lng: 3.975018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Wiebke',
    mmsi: 218553000,
    type: '9300t 2x320t 20kn',
    owner: 'BBC',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.769,
            lng: 3.975018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Paula',
    mmsi: 304010228,
    type: '9300t 2x320t 20kn',
    owner: 'BBC',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.899,
            lng: 3.975018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Annegret',
    mmsi: 304081024,
    type: '9300t 2x320t 20kn',
    owner: 'BBC',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.927599,
            lng: 3.975018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Grietje',
    mmsi: 304081008,
    type: '9300t 2x320t 20kn',
    owner: 'BBC',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.137599,
            lng: 3.975018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Annemieke',
    mmsi: 304080796,
    type: '9500t 2x275t 20kn',
    owner: 'Beluga',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.247599,
            lng: 3.975018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Calypso',
    mmsi: 305691000,
    type: '10000t 2x450t 16kn',
    owner: 'Beluga',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.357599,
            lng: 3.975018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Amoenitas',
    mmsi: 305621000,
    type: '10000t 2x450t 16kn',
    owner: 'Beluga',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.467599,
            lng: 3.975018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Imke',
    mmsi: 229127000,
    type: '10000t 2x450t 16kn',
    owner: 'Beluga',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.477599,
            lng: 3.975018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Anna',
    mmsi: 305544000,
    type: '10000t 2x450t 16kn',
    owner: 'Beluga',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.487599,
            lng: 3.975018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Hilke',
    mmsi: 305533000,
    type: '10000t 2x450t 16kn',
    owner: 'Beluga',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.497599,
            lng: 3.975018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Caroline',
    mmsi: 305480000,
    type: '10000t 2x450t 16kn',
    owner: 'UHL',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.427599,
            lng: 3.965018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Klara',
    mmsi: 255805875,
    type: '19000t 2x400t 17kn',
    owner: 'UHL',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.427599,
            lng: 3.955018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Lisa',
    mmsi: 255805785,
    type: '19000t 2x400t 17kn',
    owner: 'UHL',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.427599,
            lng: 3.945018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Hanna',
    mmsi: 255805770,
    type: '19000t 2x400t 17kn',
    owner: 'UHL',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.427599,
            lng: 3.935018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Lone',
    mmsi: 305983000,
    type: '12500t 2x1000t 20kn',
    owner: 'UHL',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.427599,
            lng: 3.925018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
  {
    name: 'Swenja',
    mmsi: 211577000,
    type: '12500t 2x1000t 20kn',
    owner: 'UHL',
    locations: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.427599,
            lng: 3.175018,
          },
          updated_at: Date.now(),
        },
      ],
      futureLocations: [],
    },
  },
];

const _ps07 = JSON.parse(
  readFileSync(
    '/Users/dev/Documents/projects/codeworks/senior/legacy/fleetMonitor/react-tailwindcss/data/PS07sampledata.json',
    'utf8',
  ),
);
const _vi01 = JSON.parse(
  readFileSync(
    '/Users/dev/Documents/projects/codeworks/senior/legacy/fleetMonitor/react-tailwindcss/data/VI01sampledata.json',
    'utf8',
  ),
);

export const mocks = {
  ps07Async: jest.fn(() => {
    return {
      then: (callback: any) => act(() => callback(_ps07)),
    };
  }),
  vi07Async: jest.fn(() => {
    return {
      then: (callback: any) => act(() => callback(_vi01)),
    };
  }),
  ps07: _ps07,
  vi01: _vi01,
  ships: _ships,
};
