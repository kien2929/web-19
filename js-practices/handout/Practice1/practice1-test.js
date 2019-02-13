const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const fs = require('fs');

const Reporter = require('jasmine-spec-reporter').SpecReporter;
const customReporter = require('../../customReporter');
jasmine.jasmine.getEnv().clearReporters();
jasmine.jasmine.getEnv().addReporter(new Reporter({
  spec : {
    displaySuccessful : false,
    displayPending: true,
    displayFailed: false
  }
}));
jasmine.jasmine.getEnv().addReporter(customReporter);

const tests1 = require(process.argv[2] || './practice1-test-data.json');
const searchPractice = require('./searchPractice');

describe("Practice 1: ", function() {
  tests1.forEach((testCase, index) => {
    it(`Search test no. ${index}.\nTarget: ${testCase.target}\nInput: ${testCase.input}`, function() {
      expect(searchPractice(testCase.input, testCase.target)).toEqual(testCase.output);
    });
  });
});

jasmine.execute();
