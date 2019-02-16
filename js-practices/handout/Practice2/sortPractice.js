'use strict'

function sort(input) {
  let temp;
  for (let i = 0; i < input.length-1; i++) {
    for(let j = 0; j < input.length-i-1; j++){
      if(input[j]>input[j+1]){
        temp=input[j];
        input[j]=input[j+1];
        input[j+1]=temp;
      }
    }
  }
  return input;
}

module.exports = sort
