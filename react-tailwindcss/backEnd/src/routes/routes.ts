import express, { Request, Response } from 'express';
import { Ship } from '../models/ships';

const router = express.Router();

router.get('/', [], async (req: Request, res: Response) => {
  const ship = await Ship.find({});
  return res.status(200).send(ship);
});

router.post('/', async (req: Request, res: Response) => {
  const { shipName, mmsi, type, owner, position } = req.body;

  const ship = Ship.build({ shipName, mmsi, type, owner, position });
  await ship.save();
  return res.status(201).send(ship);
});

export { router as routerSpy };
