## Practice 1 - Searching within an Array
//Viết 1 hàm tìm kiếm chấp nhận 2 tham sô input và output
Write a function `search` that accept 2 parameters `input` and `target`:

```javascript
function search(input, target){
  // Your code here
}
```

The data parameter will accept objects in the form of:

```javascript
{
  "input" : [
    /*
     * A sorted array containing unique integer numbers ranging from -10000 to 10000.
     * The array is sorted by ascending order, and number is distributed uniformly.
     */
    //Một mảng được sắp xếp chứa các số nguyên duy nhất từ ​​-10000 đến 10000.
    // Mảng được sắp xếp theo thứ tự tăng dần và số lượng được phân phối đồng đều.
  ],
  "target" : // a number to search for within the array.
  //1 số để tìm kiếm trong mảng
}
```

Example piece of data:

```javascript
{
  "input" : [-6795, -2462, -12, 0, 506, 7896, 10000],
  "target": 506
}
```

The objective of this practice is to write your own function `search(input, target)` so that for each `input` given, the function return the index of `target` within the array `input`: for the example data above, your function should return `4`.

If `target` is not found within `input`, your function should return -1.

Example function that will solve this problem:

```javascript
function search(input, target){
  return input.indexOf(target);
}
```

As you can see, javascript `Array` object already has a built-in function `indexOf(item)` that do exactly what we want. But, this function is a general-purpose search that works on all kind of `input` array.

Your aim then should be to write an algorithm that best solve this particular problem: finding a number within an ascending-sorted array.

**NOTE:** you are not allowed to use the built-in function `indexOf(item)` within your submission.

Your solutions will be rated based on total execution time on another data set similar to the one provided within.

After you're done submit the folder to your git repository for evaluation.
