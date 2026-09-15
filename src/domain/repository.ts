import { Room, Booking } from './models';

export interface IBakingRepository {
  addRoom(room: Room): void;
  addBooking(booking: Booking): void;
  findRoomByName(name: string): Room | undefined;
  findBookingByRoomAndDate(roomName: string, date: string): Booking | undefined;
  findBookingById(id: string): Booking | undefined;
  updateBooking(booking: Booking): void;
  clear(): void;
}