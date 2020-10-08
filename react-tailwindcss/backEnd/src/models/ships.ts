import mongoose from './index';

// interface IShip {
//   shipName: string;
//   mmsi: number;
//   type: string;
//   owner: string;
//   position: {
//     update: {
//       [time: string]: Update;
//     };
//   };
// }

// interface Update {
//   lat: number;
//   lng: number;
//   time: string;
// }

// interface ShipModelInterface extends mongoose.Model<ShipDoc> {
//   build(attr: IShip): ShipDoc;
// }

// interface ShipDoc extends mongoose.Document {
//   shipName: string;
//   mmsi: number;
//   type: string;
//   owner: string;
//   position: {
//     [time: string]: Update;
//   };
// }

// interface PositionDoc extends mongoose.Document {
//   position: {
//     [time: string]: Update;
//   };
// }

// interface UpdateDoc extends mongoose.Document {
//   lat: number;
//   lng: number;
//   time: string;
// }

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
  locations: {
    previousLocations: {
      type: Map,
      of: String,
    },
    futureLocations: {
      type: Map,
      of: String,
    },
  },
});

// shipSchema.statics.build = (attr: IShip) => {
//   return new Ship(attr);
// };
// const Ship = mongoose.model<ShipDoc, ShipModelInterface>('Ship', shipSchema);

export { Ship };
