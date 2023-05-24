export function generateFirst3SumOfGroup(number) {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const ans = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      for (let k = j; k < arr.length; k++) {
        if (i + j + k === number && i !== k) ans.push([i, j, k]);
      }
    }
  }

  return ans.length;
}
