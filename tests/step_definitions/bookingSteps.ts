import { Given, When, Then, Before } from '@cucumber/cucumber';
import request from 'supertest';
import assert from 'assert';
import { app, repository } from '../../src/app';

let response: request.Response;

Before(() => {
  repository.clear();
});

Given('que la sala {string} existe y está disponible el {string}', async (roomName: string, date: string) => {
  repository.addRoom({ id: roomName, name: roomName });
});

Given('que la sala {string} ya está ocupada el {string}', async (roomName: string, date: string) => {
  repository.addRoom({ id: roomName, name: roomName });
  repository.addBooking({
    id: `RES-EXISTING`,
    roomName,
    userName: 'Pedro',
    date,
    status: 'CONFIRMED'
  });
});

Given('que existe una reserva confirmada con ID {string} para la fecha {string}', async (bookingId: string, date: string) => {
  repository.addBooking({
    id: bookingId,
    roomName: 'Sala X',
    userName: 'Juan',
    date,
    status: 'CONFIRMED'
  });
});

When('el usuario {string} intenta reservar la {string} para el {string}', async (userName: string, roomName: string, date: string) => {
  response = await request(app)
    .post('/api/bookings')
    .send({ userName, roomName, date });
});

When('el usuario solicita cancelar la reserva {string} en la fecha {string}', async (bookingId: string, currentDate: string) => {
  response = await request(app)
    .post(`/api/bookings/${bookingId}/cancel`)
    .send({ currentDate });
});

Then('la reserva debe ser confirmada con estado {string}', (status: string) => {
  assert.strictEqual(response.body.status, status);
});

Then('la respuesta debe retornar un código de estado {int}', (statusCode: number) => {
  assert.strictEqual(response.status, statusCode);
});

Then('la reserva debe ser rechazada', () => {
  assert.strictEqual(response.status, 409);
});

Then('la reserva {string} debe cambiar su estado a {string}', (bookingId: string, status: string) => {
  assert.strictEqual(response.body.status, status);
});