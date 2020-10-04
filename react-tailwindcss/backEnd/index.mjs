import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const ships = [
  {
    shipName: 'Zea Fame',
    mmsi: 255806176,
    type: '12000t 2x350t 20kn',
    owner: 'UHL',
    lat: 52.44043,
    lng: 13.371147,
    updated: 'mock',
  },
  {
    shipName: 'Anne_Sofie',
    mmsi: 218412000,
    type: '12000t 2x350t 20kn',
    owner: 'SAL',
    lat: 52.44043,
    lng: 13.371147,
    updated: 'mock',
  },
  {
    shipName: 'Regine',
    mmsi: 218170000,
    type: '12000t 2x350t 20kn',
    owner: 'SAL',
    lat: 51.497654,
    lng: -0.12301,
    updated: 'mock',
  },
  {
    shipName: 'Trina',
    mmsi: 218705000,
    type: '12000t 2x350t 20kn',
    owner: 'SAL',
    lat: 41.377964,
    lng: 2.19258,
    updated: 'mock',
  },
  {
    shipName: 'Frauke',
    mmsi: 305164000,
    type: '12000t 2x350t 20kn',
    owner: 'UHL',
    lat: 54.427599,
    lng: 3.975018,
    updated: 'mock',
  },
  {
    shipName: 'Maria',
    mmsi: 218522000,
    type: '9000t 2x350t 20kn',
    owner: 'BBC',
    lat: 54.57599,
    lng: 3.975018,
    updated: 'mock',
  },
  {
    shipName: 'Annette',
    mmsi: 304577000,
    type: '9000t 2x350t 20kn',
    owner: 'BBC',
    lat: 54.6599,
    lng: 3.975018,
    updated: 'mock',
  },
  {
    shipName: 'Wiebke',
    mmsi: 218553000,
    type: '9300t 2x320t 20kn',
    owner: 'BBC',
    lat: 54.769,
    lng: 3.975018,
    updated: 'mock',
  },
  {
    shipName: 'Paula',
    mmsi: 304010228,
    type: '9300t 2x320t 20kn',
    owner: 'BBC',
    lat: 54.899,
    lng: 3.975018,
    updated: 'mock',
  },
  {
    shipName: 'Annegret',
    mmsi: 304081024,
    type: '9300t 2x320t 20kn',
    owner: 'BBC',
    lat: 54.927599,
    lng: 3.975018,
    updated: 'mock',
  },
  {
    shipName: 'Grietje',
    mmsi: 304081008,
    type: '9300t 2x320t 20kn',
    owner: 'BBC',
    lat: 54.137599,
    lng: 3.975018,
    updated: 'mock',
  },
  {
    shipName: 'Annemieke',
    mmsi: 304080796,
    type: '9500t 2x275t 20kn',
    owner: 'Beluga',
    lat: 54.247599,
    lng: 3.975018,
    updated: 'mock',
  },
  {
    shipName: 'Calypso',
    mmsi: 305691000,
    type: '10000t 2x450t 16kn',
    owner: 'Beluga',
    lat: 54.357599,
    lng: 3.975018,
    updated: 'mock',
  },
  {
    shipName: 'Amoenitas',
    mmsi: 305621000,
    type: '10000t 2x450t 16kn',
    owner: 'Beluga',
    lat: 54.467599,
    lng: 3.975018,
    updated: 'mock',
  },
  {
    shipName: 'Imke',
    mmsi: 229127000,
    type: '10000t 2x450t 16kn',
    owner: 'Beluga',
    lat: 54.477599,
    lng: 3.975018,
    updated: 'mock',
  },
  {
    shipName: 'Anna',
    mmsi: 305544000,
    type: '10000t 2x450t 16kn',
    owner: 'Beluga',
    lat: 54.487599,
    lng: 3.975018,
    updated: 'mock',
  },
  {
    shipName: 'Hilke',
    mmsi: 305533000,
    type: '10000t 2x450t 16kn',
    owner: 'Beluga',
    lat: 54.497599,
    lng: 3.975018,
    updated: 'mock',
  },
  {
    shipName: 'Caroline',
    mmsi: 305480000,
    type: '10000t 2x450t 16kn',
    owner: 'UHL',
    lat: 54.427599,
    lng: 3.965018,
    updated: 'mock',
  },
  {
    shipName: 'Klara',
    mmsi: 255805875,
    type: '19000t 2x400t 17kn',
    owner: 'UHL',
    lat: 54.427599,
    lng: 3.955018,
    updated: 'mock',
  },
  {
    shipName: 'Lisa',
    mmsi: 255805785,
    type: '19000t 2x400t 17kn',
    owner: 'UHL',
    lat: 54.427599,
    lng: 3.945018,
    updated: 'mock',
  },
  {
    shipName: 'Hanna',
    mmsi: 255805770,
    type: '19000t 2x400t 17kn',
    owner: 'UHL',
    lat: 54.427599,
    lng: 3.935018,
    updated: 'mock',
  },
  {
    shipName: 'Lone',
    mmsi: 305983000,
    type: '12500t 2x1000t 20kn',
    owner: 'UHL',
    lat: 54.427599,
    lng: 3.925018,
    updated: 'mock',
  },
  {
    shipName: 'Swenja',
    mmsi: 211577000,
    type: '12500t 2x1000t 20kn',
    owner: 'UHL',
    lat: 54.427599,
    lng: 3.175018,
    updated: 'mock',
  },
];

const MMSIs = ships.map((ship) => ship.mmsi);

const FILEPATH = 'data.json';

const BASE_URL = `https://services.marinetraffic.com/api/voyageforecast/${process.env.REACT_APP_API_MARINETRAFFIC}/protocol:json/mmsi:`;

const NEW_BASE_URL = `https://services.marinetraffic.com/api/exportvessel/v:5/${process.env.REACT_APP_API_MARINETRAFFIC}/timespan:2880/protocol:json/mmsi:`;

// const URLs: string[] = MMSIs.map((mmsi) => BASE_URL + mmsi);
// console.log(URLs);
const URLs = ['https://run.mocky.io/v3/ae506d98-9f5d-40a9-8b59-02ff0e7b6a12'];

// fetch real data from marinetraffic api

const getAll = Promise.all(
  URLs.map((url) =>
    fetch(url).then((res) => {
      if (res.ok) return res.json();
      console.error('response not ok');
      console.error(res);
    }),
  ),
);

getAll.then((data) => {
  fs.writeFileSync(FILEPATH, JSON.stringify(data));
});
