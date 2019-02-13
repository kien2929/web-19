const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const fs = require('fs');

const Reporter = require('jasmine-spec-reporter').SpecReporter;
const customReporter = require('../../customReporter');
jasmine.jasmine.getEnv().clearReporters();
jasmine.jasmine.getEnv().addReporter(new Reporter({
  spec: {
    displaySuccessful: false,
    displayPending: true,
    displayFailed: false
  }
}));
jasmine.jasmine.getEnv().addReporter(customReporter);

const test3 = require(process.argv[2] || './practice3-test-data.json');
const generatePractice = require('./generatePractice');

describe("Practice 3: ", function () {
  const result = generatePractice(test3);

  describe("dataset test: ", function () {
    it(`generated dataset length must equal to testLengthArray.length`, function () {
      expect(result.length).toEqual(test3.length);
    });

    if (result.length > 4) {
      it(`generated data must contain an input with target not found`, function () {
        expect(result.some(e => e.input.indexOf(e.target) === -1)).toBeTruthy();
      });
      it(`generated data must contain target at index 0`, function () {
        expect(result.some(e => e.input[0] === e.target)).toBeTruthy();
      });
      it(`generated data must contain target at last index`, function () {
        expect(result.some(e => e.input[e.input.length - 1] === e.target)).toBeTruthy();
      });
      it(`generated data must contain target at middle`, function () {
        expect(result.some(e => e.input[0] !== e.target && e.input[e.length - 1] !== e.target)).toBeTruthy();
      });
    }
  });

  describe("element test: ", function () {
    result.forEach((item, index) => {

      describe(`test item ${index}`, function () {
        it(`generated data input length must equal provided number`, function () {
          expect(item.input.length === test3[index]).toBeTruthy();
        });

        it(`generated output data must equal to index of target`, function () {
          result.forEach(item => {
            expect(item.input.indexOf(item.target)).toEqual(item.output);
          });
        });
      });
    });
  });
});

jasmine.execute();
