import mongoose from 'mongoose';

interface IPort {
  name: string;
  city: string;
  country: string;
  alias: string[];
  regions: [];
  coordinates: number[];
  province: string;
  timezone: string;
  unlocs: string[];
  code: number;
}

interface PortModelInterface extends mongoose.Model<PortDoc> {
  build(attr: IPort): PortDoc;
}

interface PortDoc extends mongoose.Document {
  name: string;
  city: string;
  country: string;
  alias: string[];
  regions: [];
  coordinates: number[];
  province: string;
  timezone: string;
  unlocs: string[];
  code: number;
}

const portSchema = new mongoose.Schema({
  name: String,
  city: String,
  country: String,
  alias: [String],
  regions: [String],
  coordinates: {
    type: Array,
  },
  province: String,
  timezone: String,
  unlocs: [String],
  code: Number,
});

portSchema.statics.build = (attr: IPort) => {
  return new Port(attr);
};
const Port = mongoose.model<PortDoc, PortModelInterface>('Port', portSchema);

export { Port };
