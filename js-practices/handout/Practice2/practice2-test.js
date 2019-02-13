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

const tests2 = require(process.argv[2] || './practice2-test-data.json');
const sortPractice = require('./sortPractice');

describe("Practice 2: ", function() {
  tests2.forEach((testCase, index) => {
    it(`sort test no. ${index}.Input: ${testCase.input}`, function() {
      var result = testCase.output;
      expect(sortPractice(testCase.input)).toEqual(result);
    });
  });
});

jasmine.execute();
