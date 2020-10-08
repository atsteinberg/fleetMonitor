import { Request, Response } from 'express';
import Port from '../models/ports';

async function getPorts(req: Request, res: Response): Promise<void> {
  const port = await Port.find({});
  res.status(200).send(port);
}

async function postPort(req: Request, res: Response): Promise<void> {
  const { name, coordinates, unlocs } = req.body;

  const port = Port.build({
    name,
    coordinates,
    unlocs,
  });
  await port.save();
  res.status(201).send(port);
}

export { getPorts, postPort };
