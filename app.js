const memory = require("./memory");
const Array = require("./array");

function main() {
  Array.SIZE_RATIO = 3;
  // Create an instance of the Array class
  let arr = new Array();

  // Add an item to the array
  arr.push(3);
  console.log(arr);
  // 1. length: 1, capacity: 3, ptr: 0

  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  console.log(arr);
  // 2. length: 6, capacity: 12, ptr: 3. Array is tripling in size every time it adds capacity.

  arr.pop();
  arr.pop();
  arr.pop();
  console.log(arr);
  // 3. length: 3, capacity: 12, ptr: 3 - though length changes, capacity does not reduce.

  // 4. Print the 1st item in the array:
  console.log(arr.get(0));
  // Empty the array and add just 1 item:
  arr.pop();
  arr.pop();
  arr.pop();
  arr.push("tauhida");
  // Print the item you just added. Can you explain the results?
  console.log(arr.get(0));
  // NaN: Arrays are homogenous data structures - all elements must be of the same type.
  // What is the purpose of the _resize() function?
  // Allocates a new, larger chunk of memory, copy any existing values from the old chunk to the new chunk, and free the old chunk.

  // 5. URLify a string:
  function urlify(str) {
    let newStr = [];
    let finalStr = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        newStr[newStr.length] = "%20";
      } else {
        newStr[newStr.length] = str[i];
      }
    }
    for (let i = 0; i < newStr.length; i++) {
      finalStr += newStr[i];
    }
    return finalStr;
  }
  console.log(urlify("tuahida parveen"));
  console.log(urlify("www.thinkful.com /tauh ida parv een"));

  // 6. Filter an array - remove numbers less than 5:
  function filter(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      // if value is greater than 5, add to new array
      if (arr[i] >= 5) {
        newArr[newArr.length] = arr[i];
      }
    }
    return newArr;
  }
  console.log(filter([0, 1, 3, 5, 3, 10, 12]));

  // 7. Max sum in an array:
  function maxSum(arr) {
    if (arr.length === 0) {
      return 0;
    }
    let maxSum = 0;
    let partialSum = 0;
    for (let item of arr) {
      partialSum += item; // add it to partialSum
      maxSum = Math.max(maxSum, partialSum); // remember the maximum
      if (partialSum < 0) partialSum = 0; // zero if negative
    }
    return maxSum;
  }
  console.log(maxSum([-1, 2, 3, -9]));

  // 8. Merge arrays:
  function mergeArrays(arr1, arr2) {
    let finalArray = [];
    while (arr1.length || arr2.length) {
      let value;
      if (arr2.length === 0 || (arr1.length && arr1[0] < arr2[0])) {
        value = arr1[0];
        arr1.splice(0, 1);
      } else if (arr1.length === 0 || arr1[0] > arr2[0]) {
        value = arr2[0];
        arr2.splice(0, 1);
      } else {
        value = arr1[0];
        arr1.splice(0, 1);
        arr2.splice(0, 1);
      }
      finalArray.push(value);
    }
    return finalArray;
  }
  console.log(mergeArrays([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));

  // 9. Remove characters:
  function removeCharacters(str, removeChars) {
    let newStr = " ";
    let last = 0;
    for (let i = 0; i < str.length; i++) {
      if (removeChars.includes(str[i]) || i === str.length) {
        newStr += str.slice(last, i);
        last = i + 1;
      }
    }
    return newStr;
  }
  console.log(
    removeCharacters("Battle of the Vowels: Hawaii vs. Grozny", "aeiou")
  );

  // 10. Products
  function arrayProduct(arr) {
    let product = arr.map((num, i) => {
      // create an array of the other numbers, removing i
      const nums = arr.slice(0, i).concat(arr.slice(i + 1, arr.length));
      return nums.reduce((acc, cur) => acc * cur);
    });
    return product;
  }
  console.log(arrayProduct([1, 3, 9, 4]));

  // 11. 2D array:
  function array2D(arr) {
    const originalArr = JSON.parse(JSON.stringify(arr));
    let newArr = arr;

    originalArr.map((row, rowI) => {
      row.map((item, arrI) => {
        if (item === 0) {
          newArr[rowI].forEach((num, i) => (newArr[rowI][i] = 0));
          newArr.forEach((newRow) => (newRow[arrI] = 0));
        }
      });
    });
    console.log(newArr);
    return newArr;
  }
  array2D([
    [1, 0, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ]);

  // 12. Check rotation
  function checkRotation(str1, str2) {
    for (let i = 0; i < str1.length; ++i) {
      // shift str1
      str1 = str1[str1.length - 1] + str1.substring(0, str1.length - 1);
      if (str1 === str2) {
        return true;
      }
    }
    return false;
  }
  console.log(checkRotation("amazon", "azonam"));
  console.log(checkRotation("amazon", "azonma"));
}

main();
