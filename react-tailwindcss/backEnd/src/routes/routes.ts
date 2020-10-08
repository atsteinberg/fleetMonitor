import express from 'express';
import { getAllShips } from '../controllers/ship';

const router = express.Router();

router.get('/ships', getAllShips);

// router.post('/', async (req: Request, res: Response) => {
//   const { shipName, mmsi, type, owner, position } = req.body;

//   // const ship = Ship.build({ shipName, mmsi, type, owner, position });
//   await ship.save();
//   return res.status(201).send(ship);
// });

export { router as routerSpy };
