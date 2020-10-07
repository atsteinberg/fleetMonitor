import express, { Request, Response } from 'express';
import { Ship } from '../models/ships';
import { Port } from '../models/ports';

const router = express.Router();

//Ships

router.get('/ships', [], async (req: Request, res: Response) => {
  const ship = await Ship.find({});
  return res.status(200).send(ship);
});

router.post('/ships', async (req: Request, res: Response) => {
  const { shipName, mmsi, type, owner, position } = req.body;

  const ship = Ship.build({ shipName, mmsi, type, owner, position });
  await ship.save();
  return res.status(201).send(ship);
});

//Ports

router.get('/ports', [], async (req: Request, res: Response) => {
  const port = await Port.find({});
  return res.status(200).send(port);
});

router.post('/ports', async (req: Request, res: Response) => {
  const {
    name,
    city,
    country,
    alias,
    regions,
    coordinates,
    province,
    timezone,
    unlocs,
    code,
  } = req.body;

  const port = Port.build({
    name,
    city,
    country,
    alias,
    regions,
    coordinates,
    province,
    timezone,
    unlocs,
    code,
  });
  await port.save();
  return res.status(201).send(port);
});

export { router as routerSpy };
