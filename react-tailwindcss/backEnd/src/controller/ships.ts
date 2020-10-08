import { Ship } from '../models/ships';
import { Request, Response } from 'express';

async function getShips(req: Request, res: Response): Promise<void> {
  const ship = await Ship.find({});
  res.status(200).send(ship);
}

async function postShip(req: Request, res: Response): Promise<void> {
  const { shipName, mmsi, type, owner, position } = req.body;

  const ship = Ship.build({ shipName, mmsi, type, owner, position });
  await ship.save();
  res.status(201).send(ship);
}

export { getShips, postShip };
