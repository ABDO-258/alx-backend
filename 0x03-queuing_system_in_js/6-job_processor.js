import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Function to send a notification
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs in the 'push_notification_code' queue
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  // Handle the job completion event
  job.on('complete', () => {
    console.log('Notification job completed');
  });

  // Handle the job failure event
  job.on('failed', () => {
    console.log('Notification job failed');
  });
  done();
});

