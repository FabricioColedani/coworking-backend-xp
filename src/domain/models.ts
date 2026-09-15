export interface Room {
  id: string;
  name: string;
}

export interface Booking {
  id: string;
  roomName: string;
  userName: string;
  date: string;
  status: 'CONFIRMED' | 'CANCELLED';
}