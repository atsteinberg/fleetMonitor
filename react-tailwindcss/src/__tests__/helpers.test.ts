import { calculateDistance } from '../services/helpers';

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

describe('calculateDistance', () => {
  it('should do stuff', () => {
    for (let i = 0; i < route.length - 2; i++) {
      const pos1 = route[i];
      const pos2 = route[i + 1];
      console.log(calculateDistance(pos1, pos2));
    }
  });
  it('should do more stuff', () => {
    const date1 = new Date('2020-10-03T07:17:00');
    const date2 = new Date('2020-10-09T17:48:00');
    console.log(
      'time',
      2724 / ((date2.getTime() - date1.getTime()) / 1000 / 60 / 60),
    );
  });
});
