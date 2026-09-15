import { IBakingRepository } from '../domain/repository';
import { Booking } from '../domain/models';

export class CoworkingService {
  constructor(private repo: IBakingRepository) {}

  createBooking(userName: string, roomName: string, date: string): { success: boolean; booking?: Booking; message?: string } {
    const room = this.repo.findRoomByName(roomName);
    if (!room) {
      return { success: false, message: 'La sala no existe' };
    }

    const existingBooking = this.repo.findBookingByRoomAndDate(roomName, date);
    if (existingBooking) {
      return { success: false, message: 'La sala ya está ocupada en esta fecha' };
    }

    const newBooking: Booking = {
      id: `RES-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      roomName,
      userName,
      date,
      status: 'CONFIRMED'
    };

    this.repo.addBooking(newBooking);
    return { success: true, booking: newBooking };
  }

  cancelBooking(bookingId: string, currentDate: string): { success: boolean; booking?: Booking; message?: string } {
    const booking = this.repo.findBookingById(bookingId);
    if (!booking) {
      return { success: false, message: 'Reserva no encontrada' };
    }

    const bookingDate = new Date(booking.date).getTime();
    const requestDate = new Date(currentDate).getTime();
    const diffHours = (bookingDate - requestDate) / (1000 * 60 * 60);

    if (diffHours < 24) {
      return { success: false, message: 'No se puede cancelar con menos de 24 horas de anticipación' };
    }

    booking.status = 'CANCELLED';
    this.repo.updateBooking(booking);
    return { success: true, booking };
  }
}