'use strict';
const chalk = require('chalk');

const styleFactory = (color) => {
    return function (str) {
          return chalk[color](str);
    };
};

const numberStyle = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
let style = {
    green: styleFactory('green'),
    red: styleFactory('red'),
    yellow: styleFactory('yellow'),
    blue: styleFactory('blue'),
    cyan: styleFactory('cyan'),
    white: styleFactory('white'),
    gray: styleFactory('gray'),
    underline: styleFactory('underline')
};

let specPass = 0;
let specFail = [];
let processTime;

let myCustomReporter = {
    jasmineStarted: function(suiteInfo) {
        console.log(style.yellow(`Running suite with ${suiteInfo.totalSpecsDefined} specs`));
        console.log(style.yellow('Reporting via CustomReporter'));
    },

    suiteStarted: function(result) {
        specPass = 0;
        specFail = [];
        processTime = process.hrtime();
        console.log(style.cyan('\nSuite started: ' + result.description));
    },

    suiteDone: function(result) {
        if (specFail.length > 0) {
          console.log('\n');
          console.log(style.red(`${specFail.length} case failed`));
          specFail.forEach((spec) => {
              process.stdout.cursorTo(5);
              console.log(style.red(`x ${spec.description}`));
              process.stdout.cursorTo(10);
              spec.failedExpectations.forEach(fail => console.log(style.red(`Err : ${fail.message}`)));
          })
        }
        let timeDone = process.hrtime(processTime);
        console.log(`\nTest ${result.description} done in ${numberStyle(timeDone[0] * 1e9 + timeDone[1])} nanoseconds`);
    },

    specStarted: function(result) {
    },

    specDone: function(result) {
        if (result.status === "passed") {
          specPass++;
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(style.green(`${specPass} cases have been passed`));
        } else {
          specFail.push({ failedExpectations : result.failedExpectations, description: result.description })
        }
    },

    jasmineDone: function(results) {

    }
};

module.exports = myCustomReporter;
