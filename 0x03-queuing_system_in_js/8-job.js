// Function to create push notification jobs
function createPushNotificationsJobs(jobs, queue) {
    // Check if jobs is an array, if not throw an error
    if (!Array.isArray(jobs)) {
      throw new Error('Jobs is not an array');
    }
  
    // Iterate over the jobs array
    jobs.forEach((jobData) => {
      // Create a new job in the queue 'push_notification_code_3'
      const job = queue.create('push_notification_code_3', jobData);
  
      // Log when the job is created
      job.on('enqueue', () => {
        console.log(`Notification job created: ${job.id}`);
      });
  
      // Log when the job is completed
      job.on('complete', () => {
        console.log(`Notification job ${job.id} completed`);
      });
  
      // Log when the job fails
      job.on('failed', (errorMessage) => {
        console.log(`Notification job ${job.id} failed: ${errorMessage}`);
      });
  
      // Log the job's progress
      job.on('progress', (progress) => {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      });
  
      // Save the job to the queue
      job.save();
    });
  }
  
  module.exports = createPushNotificationsJobs;