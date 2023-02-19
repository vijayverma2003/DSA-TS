// This problem was asked by Uber.

// Given an array of integers, return a new array such that each element at index i of the new array
// is the product of all the numbers in the original array except the one at i.

// For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24].
// If our input was [3, 2, 1], the expected output would be [2, 3, 6].

function dailyCodingProblem(arr: number[]) {
  const fromLeft = [];
  let fromRight = [];

  let left = 1;
  let right = 1;

  for (let i = 0, j = arr.length - 1; i < arr.length, j >= 0; i++, j--) {
    left *= arr[i];
    right *= arr[j];

    fromLeft.push(left);
    fromRight[j] = right;
  }

  let result = [];

  for (let i = 0; i < arr.length; i++)
    result.push((fromLeft[i - 1] ?? 1) * (fromRight[i + 1] ?? 1));

  return result;
}
