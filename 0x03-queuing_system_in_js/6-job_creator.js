import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Define the job data object
const jobData = {
  phoneNumber: '1234567890',
  message: 'This is the notification message',
};

// Create a job in the 'push_notification_code' queue with the job data
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (!err) {
      console.log(`Notification job created: ${job.id}`);
    }
});

// Handle the job completion event
job.on('complete', () => {
  console.log('Notification job completed');
});

// Handle the job failure event
job.on('failed', () => {
  console.log('Notification job failed');
});
