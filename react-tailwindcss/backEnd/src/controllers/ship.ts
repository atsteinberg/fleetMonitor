import mongoose from '../models/index';
import { Request, Response } from 'express';
import ShipDb from '../models/ships';
import { Ship } from '../../../src/types/Ship';

export const getAllShips = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const ships = await ShipDb.find({});
    res.status(200).send(ships);
  } catch (err) {
    handleError(req, res, err);
  }
};

export const getOneShip = async (
  req: Request,
  res: Response,
  mmsi: string,
): Promise<void> => {
  try {
    const ship = await ShipDb.find({ where: { mmsi } });
    if (ship.length === 0) {
      res.status(404);
      res.send(`🤷‍♀️ No ship with mmsi ${mmsi} found in db`);
    } else {
      res.send(ship[0]);
    }
  } catch (error) {
    handleError(req, res, error);
  }
};

export const postOneShip = async (
  req: Request,
  res: Response,
  ship: Ship,
): Promise<void> => {};

function handleError(req: Request, res: Response, error: Error) {
  console.error(error);
  res.send(`db error: ${error.message}`);
  if (error instanceof mongoose.Error.ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
}
