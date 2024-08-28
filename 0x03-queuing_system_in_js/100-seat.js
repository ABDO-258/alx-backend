import redis from 'redis';
import { promisify } from 'util';
import express from 'express';
import kue from 'kue';

const app = express();
const client = redis.createClient();
const queue = kue.createQueue();

const reserveSeat = (number) => {
  client.set('available_seats', number);
};

const getCurrentAvailableSeats = async () => {
  const seats = await promisify(client.get).bind(client)('available_seats');
  return seats;
};

let reservationEnabled = true;

// Set initial available seats to 50 when the server starts
reserveSeat(50);

app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats });
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservations are blocked' });
  }

  const job = queue.create('reserve_seat', {}).save((err) => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }
    return res.json({ status: 'Reservation in process' });
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (errorMessage) => {
    console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
  });
});

app.get('/process', (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    const currentSeats = await getCurrentAvailableSeats();
    const availableSeats = parseInt(currentSeats, 10);

    if (availableSeats > 0) {
      reserveSeat(availableSeats - 1);
      if (availableSeats - 1 === 0) {
        reservationEnabled = false;
      }
      done();
    } else {
      done(new Error('Not enough seats available'));
    }
  });
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});
