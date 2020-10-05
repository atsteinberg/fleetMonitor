import mongoose from 'mongoose';

interface IShip {
  shipName: string;
  mmsi: number;
  type: string;
  owner: string;
  position: Array<Position>;
}

declare interface Position {
  lat: number;
  lng: number;
  updated: string;
}

interface ShipModelInterface extends mongoose.Model<ShipDoc> {
  build(attr: IShip): ShipDoc;
}

interface ShipDoc extends mongoose.Document {
  shipName: string;
  mmsi: number;
  type: string;
  owner: string;
  position: Array<PositionDoc>;
}

interface PositionDoc extends mongoose.Document {
  lat: number;
  lng: number;
  updated: string;
}

const shipSchema = new mongoose.Schema({
  shipName: {
    type: String,
    required: true,
  },
  mmsi: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  position: [
    {
      lat: Number,
      lng: Number,
      updated: String,
    },
  ],
});

shipSchema.statics.build = (attr: IShip) => {
  return new Ship(attr);
};
const Ship = mongoose.model<ShipDoc, ShipModelInterface>('Ship', shipSchema);

export { Ship };

// interface Position {
//   lat: number;
//   lng: number;
//   update: string;
// }

// interface IShip {
//   shipName: string;
//   mmsi: number;
//   type: string;
//   owner: string;
//   position: Position[];
// }

// // Ship.build({
//   shipName: 'Hanna',
//   mmsi: 255805770,
//   type: '19000t 2x400t 17kn',
//   owner: 'UHL',
//   lat: 54.427599,
//   lng: 3.935018,
//   updated: 'mock',
// });

// const positionSchema = new mongoose.Schema({
//   lat: {
//     type: Number,
//     required: true,
//   },
//   lng: {
//     type: Number,
//     required: true,
//   },
//   updated: {
//     type: String,
//     required: true,
//   },
// });
