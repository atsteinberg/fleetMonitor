'use strict';

import mongoose from 'mongoose';

const PATHTODB = process.env.PATHTODB || 'mongodb://localhost:27017/fleetSpy';

mongoose.connect(PATHTODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

export default mongoose;
