import express from 'express';
import { InMemoryRepository } from './infrastructure/inMemoryRepository';
import { CoworkingService } from './services/coworkingService';
import { BookingController } from './controllers/bookingController';

const app = express();
app.use(express.json());

const repository = new InMemoryRepository();
const service = new CoworkingService(repository);
const controller = new BookingController(service);

app.post('/api/bookings', controller.createBooking);
app.post('/api/bookings/:id/cancel', controller.cancelBooking);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
  });
}

export { app, repository };