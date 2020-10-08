import { extractHistory } from './components/Map/MapComponent/helper';
import { ShipsState, UpdateAction } from './types/redux';
import { Ship, ShipHistory } from './types/ShipInterface';

const ships: Ship[] = [
  {
    shipName: 'Zea Fame',
    mmsi: '255806176',
    type: '12000t 2x350t 20kn',
    owner: 'UHL',
    lat: 52.44043,
    lng: 13.371147,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 52.44043,
            lng: 13.371147,
          },
        },
        {
          time: Date.now() - 2000000,
          coordinates: {
            lat: 50,
            lng: 10,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Anne_Sofie',
    mmsi: '218412000',
    type: '12000t 2x350t 20kn',
    owner: 'SAL',
    lat: 52.44043,
    lng: 13.371147,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 52.44043,
            lng: 13.371147,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Regine',
    mmsi: '218170000',
    type: '12000t 2x350t 20kn',
    owner: 'SAL',
    lat: 51.497654,
    lng: -0.12301,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 51.497654,
            lng: -0.12301,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Trina',
    mmsi: '218705000',
    type: '12000t 2x350t 20kn',
    owner: 'SAL',
    lat: 41.377964,
    lng: 2.19258,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 41.377964,
            lng: 2.19258,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Frauke',
    mmsi: '305164000',
    type: '12000t 2x350t 20kn',
    owner: 'UHL',
    lat: 54.427599,
    lng: 3.975018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.427599,
            lng: 3.975018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Maria',
    mmsi: '218522000',
    type: '9000t 2x350t 20kn',
    owner: 'BBC',
    lat: 54.57599,
    lng: 3.975018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.57599,
            lng: 3.975018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Annette',
    mmsi: '304577000',
    type: '9000t 2x350t 20kn',
    owner: 'BBC',
    lat: 54.6599,
    lng: 3.975018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.6599,
            lng: 3.975018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Wiebke',
    mmsi: '218553000',
    type: '9300t 2x320t 20kn',
    owner: 'BBC',
    lat: 54.769,
    lng: 3.97501,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.769,
            lng: 3.975018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Paula',
    mmsi: '304010228',
    type: '9300t 2x320t 20kn',
    owner: 'BBC',
    lat: 54.899,
    lng: 3.97501,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.899,
            lng: 3.975018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Annegret',
    mmsi: '304081024',
    type: '9300t 2x320t 20kn',
    owner: 'BBC',
    lat: 54.927599,
    lng: 3.975018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.927599,
            lng: 3.975018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Grietje',
    mmsi: '304081008',
    type: '9300t 2x320t 20kn',
    owner: 'BBC',
    lat: 54.137599,
    lng: 3.975018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.137599,
            lng: 3.975018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Annemieke',
    mmsi: '304080796',
    type: '9500t 2x275t 20kn',
    owner: 'Beluga',
    lat: 54.247599,
    lng: 3.975018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.247599,
            lng: 3.975018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Calypso',
    mmsi: '305691000',
    type: '10000t 2x450t 16kn',
    owner: 'Beluga',
    lat: 54.357599,
    lng: 3.975018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.357599,
            lng: 3.975018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Amoenitas',
    mmsi: '305621000',
    type: '10000t 2x450t 16kn',
    owner: 'Beluga',
    lat: 54.467599,
    lng: 3.975018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.467599,
            lng: 3.975018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Imke',
    mmsi: '229127000',
    type: '10000t 2x450t 16kn',
    owner: 'Beluga',
    lat: 54.477599,
    lng: 3.975018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.477599,
            lng: 3.975018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Anna',
    mmsi: '305544000',
    type: '10000t 2x450t 16kn',
    owner: 'Beluga',
    lat: 54.487599,
    lng: 3.975018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.487599,
            lng: 3.975018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Hilke',
    mmsi: '305533000',
    type: '10000t 2x450t 16kn',
    owner: 'Beluga',
    lat: 54.497599,
    lng: 3.975018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.497599,
            lng: 3.975018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Caroline',
    mmsi: '305480000',
    type: '10000t 2x450t 16kn',
    owner: 'UHL',
    lat: 54.427599,
    lng: 3.965018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.427599,
            lng: 3.965018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Klara',
    mmsi: '255805875',
    type: '19000t 2x400t 17kn',
    owner: 'UHL',
    lat: 54.427599,
    lng: 3.955018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.427599,
            lng: 3.955018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Lisa',
    mmsi: '255805785',
    type: '19000t 2x400t 17kn',
    owner: 'UHL',
    lat: 54.427599,
    lng: 3.945018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.427599,
            lng: 3.945018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Hanna',
    mmsi: '255805770',
    type: '19000t 2x400t 17kn',
    owner: 'UHL',
    lat: 54.427599,
    lng: 3.935018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.427599,
            lng: 3.935018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Lone',
    mmsi: '305983000',
    type: '12500t 2x1000t 20kn',
    owner: 'UHL',
    lat: 54.427599,
    lng: 3.925018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.427599,
            lng: 3.925018,
          },
        },
      ],
      futureLocations: [],
    },
  },
  {
    shipName: 'Swenja',
    mmsi: '211577000',
    type: '12500t 2x1000t 20kn',
    owner: 'UHL',
    lat: 54.427599,
    lng: 3.175018,
    updated: true,
    history: {
      previousLocations: [
        {
          time: Date.now(),
          coordinates: {
            lat: 54.427599,
            lng: 3.175018,
          },
        },
      ],
      futureLocations: [],
    },
  },
];

const initialShips = ships;

export default function (
  state: ShipsState = {
    ships: initialShips,
    history: extractHistory(initialShips),
  },
  action: UpdateAction,
): { ships: Ship[]; history: ShipHistory } {
  let updatedShips;

  switch (action.type) {
    case 'POSITION_UPDATE':
      updatedShips = [...state.ships];
      const shipToUpdate = updatedShips[action.index];
      if (!shipToUpdate.history) {
        shipToUpdate.history = {
          previousLocations: [],
          futureLocations: [],
        };
      }
      shipToUpdate.history.previousLocations = [
        ...shipToUpdate.history.previousLocations,
        action.newDatedCoordinate,
      ];

      return { ships: updatedShips, history: extractHistory(updatedShips) };

    default:
      return state;
  }
}
