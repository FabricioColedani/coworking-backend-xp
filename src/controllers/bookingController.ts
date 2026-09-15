import { Request, Response } from 'express';
import { CoworkingService } from '../services/coworkingService';

export class BookingController {
  constructor(private service: CoworkingService) {}

  createBooking = (req: Request, res: Response): void => {
    const { userName, roomName, date } = req.body;
    const result = this.service.createBooking(userName, roomName, date);

    if (!result.success) {
      res.status(409).json({ error: result.message });
      return;
    }

    res.status(201).json(result.booking);
  };

  cancelBooking = (req: Request, res: Response): void => {
    const id = req.params.id as string;
    const { currentDate } = req.body;
    const result = this.service.cancelBooking(id, currentDate);

    if (!result.success) {
      res.status(400).json({ error: result.message });
      return;
    }

    res.status(200).json(result.booking);
  };
}