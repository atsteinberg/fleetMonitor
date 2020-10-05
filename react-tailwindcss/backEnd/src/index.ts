import express from 'express';
import { json } from 'body-parser';
import { routerSpy } from './routes/routes';
import mongoose from 'mongoose';

const app = express();
app.use(json());
app.use(routerSpy);

mongoose.connect(
  'mongodb://localhost:27017/fleetpsy',
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connected to FleetSPY DB');
  },
);

app.listen(3090, () => {
  console.log('Server running on port 3090');
});
