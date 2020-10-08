import express from 'express';

import { getShips, postShip } from '../controller/ships';
import { getPorts, postPort } from '../controller/ports';

const router = express.Router();

//Ships

router.get('/ships', getShips);

router.post('/ships', postShip);

//Ports

router.get('/ports', getPorts);

router.post('/ports', postPort);

export { router as routerSpy };
