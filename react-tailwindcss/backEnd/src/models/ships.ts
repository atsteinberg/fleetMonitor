import mongoose from 'mongoose';

interface IShip {
  shipName: string;
  mmsi: number;
  type: string;
  owner: string;
  position: {
    update: {
      [time: string]: Update;
    };
  };
}

interface Update {
  lat: number;
  lng: number;
  time: string;
}

interface ShipModelInterface extends mongoose.Model<ShipDoc> {
  build(attr: IShip): ShipDoc;
}

interface ShipDoc extends mongoose.Document {
  shipName: string;
  mmsi: number;
  type: string;
  owner: string;
  position: {
    [time: string]: Update;
  };
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
  position: {
    type: [mongoose.Schema.Types.Mixed],
  },
});

shipSchema.statics.build = (attr: IShip) => {
  return new Ship(attr);
};
const Ship = mongoose.model<ShipDoc, ShipModelInterface>('Ship', shipSchema);

export { Ship };
