import mongoose from 'mongoose';

interface IPort {
  name: string;
  coordinates?: number[];
  unlocs: string[];
}

interface PortModelInterface extends mongoose.Model<PortDoc> {
  build(attr: IPort): PortDoc;
}

interface PortDoc extends mongoose.Document {
  name: string;
  coordinates?: number[];
  unlocs: string[];
}

const portSchema = new mongoose.Schema({
  name: String,
  coordinates: [Number],
  unlocs: [String],
});

portSchema.statics.build = (attr: IPort) => {
  return new Port(attr);
};
const Port = mongoose.model<PortDoc, PortModelInterface>('Port', portSchema);

// module.exports = mongoose.model('Port', portSchema);

export default Port;
