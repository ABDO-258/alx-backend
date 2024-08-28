import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.error('Redis client not connected to the server:', err); 

});

// Subscribe to the channel "holberton school channel"
client.subscribe('holberton school channel');

// When receiving a message on the channel
client.on('message', (channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
      client.unsubscribe();
      client.quit();
  }
});
