const kue = require('kue');
const createPushNotificationsJobs = require('./8-job');
const { expect } = require('chai');
const sinon = require('sinon');

// Create a queue and set it to test mode
const queue = kue.createQueue();

// Test suite
describe('createPushNotificationsJobs', () => {
  beforeEach((done) => {
    queue.testMode.enter();
    queue.testMode.clear();
    done();
  });

  afterEach(() => {
    queue.testMode.exit();
  });

  it('should display an error message if jobs is not an array', () => {
    const invalidJobs = {};
    expect(() => createPushNotificationsJobs(invalidJobs, queue))
      .to.throw('Jobs is not an array');
  });

  it('should create jobs and log the appropriate messages', (done) => {
    const consoleLog = sinon.stub(console, 'log');

    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' },
    ];

    createPushNotificationsJobs(jobs, queue);

    setTimeout(() => {
      expect(queue.testMode.jobs.length).to.equal(2);
      expect(consoleLog.calledWith(sinon.match(/Notification job created: \d+/))).to.be.true;

      // Clean up stub
      consoleLog.restore();
      done();
    }, 100); // Adjust timeout as needed
  });
});
