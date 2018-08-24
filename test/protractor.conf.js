exports.config = {
  directConnect: false,

  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions: { 
        args: [ 
          "--headless", 
          "--disable-gpu", 
          "--window-size=1920,1080"] }
    }, {
      browserName: 'chrome',
      chromeOptions: { 
        args: [ 
          "--window-size=1920,1080"] }
    }, {
      browserName: 'safari',
      safariOptions: { 
        args: [ 
          "--window-size=1920,1200"] }
    },
  ],

  maxSessions: 1,

  seleniumAddress: 'http://0.0.0.0:4444/wd/hub',
  specs: ['test/e2e/dist/*.js'],

  plugins: [{
    package: 'aurelia-protractor-plugin',
  }],

  params: {
    aureliaUrl: string = 'http://localhost:9000',
    processEngineUrl: string = 'http://localhost:8000',
    defaultTimeoutMS: number = 5000
  },

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },

  onPrepare: function() {
    afterEach(() => {
      browser.executeScript('window.localStorage.clear();');
      browser.executeScript('window.sessionStorage.clear();');
      browser.driver.manage().deleteAllCookies();
    });
  }
};
