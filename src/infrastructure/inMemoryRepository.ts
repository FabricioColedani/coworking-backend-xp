import { IBakingRepository } from '../domain/repository';
import { Room, Booking } from '../domain/models';

export class InMemoryRepository implements IBakingRepository {
  private rooms: Room[] = [];
  private bookings: Booking[] = [];

  addRoom(room: Room): void {
    this.rooms.push(room);
  }

  addBooking(booking: Booking): void {
    this.bookings.push(booking);
  }

  findRoomByName(name: string): Room | undefined {
    return this.rooms.find(r => r.name === name);
  }

  findBookingByRoomAndDate(roomName: string, date: string): Booking | undefined {
    return this.bookings.find(b => b.roomName === roomName && b.date === date && b.status === 'CONFIRMED');
  }

  findBookingById(id: string): Booking | undefined {
    return this.bookings.find(b => b.id === id);
  }

  updateBooking(updated: Booking): void {
    const index = this.bookings.findIndex(b => b.id === updated.id);
    if (index !== -1) {
      this.bookings[index] = updated;
    }
  }

  clear(): void {
    this.rooms = [];
    this.bookings = [];
  }
}