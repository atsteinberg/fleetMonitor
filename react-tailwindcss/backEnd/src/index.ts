import express from 'express';
import { json } from 'body-parser';
import { routerSpy } from './routes/routes';
import mongoose from 'mongoose';

const app = express();
const PORT = 3005;

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
