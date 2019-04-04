const browserstack = require('browserstack-local');
const chai = require('chai');

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACC_KEY',
  updateJob: false,
  specs: [
    './test/js-webdriver/specs/*'
  ],
  exclude: [],
  sync: true,

  capabilities: [{
    browser: 'chrome',
    name: 'local_test',
    build: 'webdriver-browserstack',
    'browserstack.local': true
  }],

  logLevel: 'warn',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: 'hub.browserstack.com',
  reporters: ['spec'],

  before () {
    global.expect = chai.expect;
    chai.Should();
  },
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },

  // Code to start browserstack local before start of test
  onPrepare () {
    console.log("Connecting local");
    return new Promise(((resolve, reject) => {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start(
        {
          'key': exports.config.key,
          'force': 'true'
        }
        , (error) => {
          if (error) return reject(error);
          console.log('Connected. Now testing...');
          resolve();
      });
    }));
  },

  // Code to stop browserstack local after end of test
  onComplete () {
    return new Promise(( (resolve) => {
      exports.bs_local.stop(()=>{resolve();});
    }))
  },
}
