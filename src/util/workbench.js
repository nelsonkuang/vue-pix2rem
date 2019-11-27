function sumNums (nums, start, end) {
  return nums.slice(start, end + 1).reduce((sum, item) => {
    return sum += item
  }, 0)
}
function maxSumTwoNoOverlap (nums, l, m) {
  let x, y, len = nums.length, maxSum = 0
  // l在m左边情况
  for (x = 0; x < len - m - l + 1; x++) {
    y = x + l
    while (y > x + l - 1 && y + m - 1 < len) {
      maxSum = Math.max(maxSum, sumNums(nums, x, x + l - 1) + sumNums(nums, y, y + m - 1))
      y++
    }
  }
  // l在m右边情况
  for (x = 0; x < len - m - l + 1; x++) {
    y = x + m
    while (y > x + m - 1 && y + l - 1 < len) {
      maxSum = Math.max(maxSum, sumNums(nums, x, x + m - 1) + sumNums(nums, y, y + l - 1))
      y++
    }
  }

  return maxSum
}
