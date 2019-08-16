/*
----问题

有 N 件物品和一个容量是 V 的背包。每件物品只能使用一次。

第 i 件物品的体积是 vi ，价值是 wi 。

求解将哪些物品装入背包，可使这些物品的总体积不超过背包容量，且总价值最大。
输出最大价值。

-----输入格式
每件物品只有一件我们可以选择拿或者不拿，我们定义v[ i ]为物品的体积，w[i]为物品的价值。

我们再来看状态转移方程  f[ i ][ j ] = max ( f[ i-1 ][ j ] , f[ i-1 ][ j-v[ i ] ] + w[ i ] )

*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  let sum = 0
  for (let num of nums) {
    sum += num
  }

  if (sum & 1 === 1) return false

  const half = sum >> 1

  // v[ i ]为物品的体积，w[i]为物品的价值。在此题中，单个数字的体积就是其价值，也就是 v[i] ===  w[i] === nums[i-1]
  let dp = Array(nums.length + 1)
  dp[0] = [0, ...Array(nums.length).fill(0)] // 前0个元素，容量为0情况，最大价值都为0
  // 前1个元素，容量为j情况，最大价值取决于装不装得下，如果能装得下最大价值就是第一个数
  dp[1] = [0, ...Array(nums.length).fill(0)]
  for (let j = 1; j < half + 1; j++) {
    if (j >= nums[0]) {
      dp[1][j] = nums[0]
    }
  }
  // 前两个元素开始，当前i个容积为j的最大价值有两种情况，
  // 1、第i个数装不下了，我不要了，值为dp[i - 1][j]；
  // 2、装得下，我要，那么第个的值占的容积为nums[i-1]，价值也是nums[i-1]，剩下的可以留给前i-1个数来分的容积为j - nums[i-1]，也就是值为dp[i - 1][j - nums[i-1]] + nums[i-1]
  // 状态转移方程 f[ i ][ j ] = max ( f[ i-1 ][ j ] , f[ i-1 ][ j-v[ i ] ] + w[ i ] )
  for (let i = 2; i < nums.length + 1; i++) {
    dp[i] = [0, ...Array(half).fill(0)]
    for (let j = 1; j < half + 1; j++) {
      // 要注意前i个数中取第i个数的值是 nums[i-1]，因为是由0开始算
      // if(j >= nums[i-1]) { // 这里不注释可以把所有的值都求出来
        dp[i][j] = Math.max(dp[i - 1][j], j >= nums[i-1] ? dp[i - 1][j - nums[i-1]] + nums[i-1] : 0)
      // }
    }
  }
  // console.log(dp)
  return dp[nums.length][half] === half
}