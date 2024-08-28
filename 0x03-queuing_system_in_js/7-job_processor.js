import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send a notification
function sendNotification(phoneNumber, message, job, done) {
  // Start tracking the job progress at 0%
  job.progress(0, 100);
  // Check if the phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }
  // Simulate progress to 50%
  job.progress(50, 100);
  // Log the notification message
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Complete the job
  done();
}
// Process the queue 'push_notification_code_2' with concurrency of 2 jobs at a time
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
