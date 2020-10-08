import mongoose from './index';

interface IPort {
  name: string;
  city: string;
  contry: string;
  alias: [];
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
  contry: string;
  alias: [];
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
  contry: String,
  alias: Array,
  regions: Array,
  coordinates: Array,
  province: String,
  timezone: String,
  unlocs: Array,
  code: Number,
});

portSchema.statics.build = (attr: IPort) => {
  return new Port(attr);
};
const Port = mongoose.model<PortDoc, PortModelInterface>('Port', portSchema);

export { Port };
