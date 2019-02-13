'use strict';

const {paths} = require('./test-paths.json');
const test1Data = require('./practice1-benchmark-data.json');
const test2Data = require('./practice2-benchmark-data.json');
const test3Data = require('./practice3-benchmark-data.json');

const numberStyle = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var top = {
  path1 : '',
  time1 : Infinity,
  path2 : '',
  time2 : Infinity,
  path3 : '',
  time3 : Infinity
}

console.log(`/=================\\`)
console.log(' Benchmark results ');
console.log(`\\=================/`)
paths.forEach(path => {
  
  console.log(`Path ${path}: `);
  const search = require(`${path}/Practice1/searchPractice.js`);
  const startTime1 = process.hrtime();
  test1Data.forEach((testCase, index) => {
    search(testCase.input, testCase.target);
  });
  const finishTime1 = process.hrtime(startTime1);
  const time1 = finishTime1[0] * 1e9 + finishTime1[1];
  if(time1 < top.time1){
    top.path1 = path;
    top.time1 = time1;
  }
  console.log(`Search completed in ${numberStyle(time1)} nanoseconds`);
  

  const sort = require(`${path}/Practice2/sortPractice.js`);
  const startTime2 = process.hrtime();
  test2Data.forEach((testCase, index) => {
    sort(testCase.input);
  });
  const finishTime2 = process.hrtime(startTime2);
  const time2 = finishTime2[0] * 1e9 + finishTime2[1];
  if(time2 < top.time2){
    top.path2 = path;
    top.time2 = time2;
  }
  console.log(`Sort completed in ${numberStyle(time2)} nanoseconds`);

  const generate = require(`${path}/Practice3/generatePractice.js`);
  const startTime3 = process.hrtime();
  generate(test3Data);
  const finishTime3 = process.hrtime(startTime3);
  const time3 = finishTime3[0] * 1e9 + finishTime3[1];
  if(time3 < top.time3){
    top.path3 = path;
    top.time3 = time3;
  }
  console.log(`Generate completed in ${numberStyle(finishTime3[0] * 1e9 + finishTime3[1])} nanoseconds`);
  console.log(`===`)
});

console.log(`/===========\\`)
console.log(' Top results');
console.log(`\\===========/`)
console.log(`Practice 1 - Search:`);
console.log(`${numberStyle(top.time1)}ns for path ${top.path1}`);
console.log(`-----`);
console.log(`Practice 2 - Sort:`);
console.log(`${numberStyle(top.time2)}ns for path ${top.path2}`);
console.log(`-----`);
console.log(`Practice 3 - Generate:`);
console.log(`${numberStyle(top.time3)}ns for path ${top.path3}`);
console.log(`-----`);