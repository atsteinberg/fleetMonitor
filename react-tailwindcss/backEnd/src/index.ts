import express from 'express';
import { json } from 'body-parser';
import { routerSpy } from './routes/routes';
import cors from 'cors';
import mongoose from 'mongoose';

const PORT = process.env.DB_PORT || 3001;

const app = express();
app.use(json());
app.use(
  cors({
    origin: process.env.APP_PORT || 'http://localhost:3000',
  }),
);
app.use(routerSpy);

const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => {
  console.log('🔌 Successfully connected to db');
  app.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`);
  });
});
