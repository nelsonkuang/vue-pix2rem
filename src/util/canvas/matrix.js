export function create () {
  /** 
   * 初始一个矩阵，开始时，a, d 为 1，其它为 0
   * a  c  e
   * b  d  f
   * 0  0  1
   * 
   * a	水平缩放绘图
   * b	水平倾斜绘图
   * c	垂直倾斜绘图
   * d	垂直缩放绘图
   * e	水平移动绘图
   * f	垂直移动绘图
   * 
   * 1  0  0
   * 0  1  0
   * 0  0  1
   * 
   * */
  let m = []
  m[0] = 1
  m[1] = 0
  m[2] = 0
  m[3] = 1
  m[4] = 0
  m[5] = 0
  return m
}
export function multiply (m1, m2) { // 左乘
  /** 
   * 已知矩阵 A 和矩阵 B，求 A 和 B 的乘积 C= AB
   * 常规方法：矩阵 C 中每一个元素 Cij = A 的第 i 行 乘以（点乘） B 的第 j 列
   * 
   * m1[0]  m1[2]  m1[4]     m2[0]  m2[2]  m2[4]     m[0]  m[2]  m[4]
   * m1[1]  m1[3]  m1[5]  X  m2[1]  m2[3]  m2[5]  =  m[1]  m[3]  m[5]
   *  0      0      1          0      0      1        0      0     1
   * 
   * 
   * */
  let m = []
  m[0] = m1[0] * m2[0] + m1[2] * m2[1] + m1[4] * 0
  m[2] = m1[0] * m2[2] + m1[2] * m2[3] + m1[4] * 0
  m[4] = m1[0] * m2[4] + m1[2] * m2[5] + m1[4] * 1
  m[1] = m1[1] * m2[0] + m1[3] * m2[1] + m1[5] * 0
  m[3] = m1[1] * m2[2] + m1[3] * m2[3] + m1[5] * 0
  m[5] = m1[1] * m2[4] + m1[3] * m2[5] + m1[5] * 1
  return m
}
export function translate (m, v) {
  let arr = [...m]
  arr[4] = arr[4] + v[0]
  arr[5] = arr[5] + v[1]
  return arr
}
export function rotate (m, rad) {
  /**
   * 假如 A（X, Y） 点初始角度为 a，绕圆点旋转 θ 度，在坐标系上可得 B 点的坐标（X', Y'），算出半径为 r = √(X² + Y²) 
   * X' = cos(a + θ) * r
   * Y' = sin(a + θ) * r
   * 根据三角函数公式：cos(α + β) = cosαcosβ - sinαsinβ
   * 可得 X' = r * cosa * cosθ – r * sina * sinθ =  X * cosθ – Y * sinθ
   * 根据三角函数公式：sin(α + β) = sinαcosβ + cosαsinβ
   * 可得 Y' = sinacosθ * r + cosasinθ * r =  X * sinθ + Y * cosθ
   * X’       cosθ    -sinθ   0       X
   * Y’   =   sinθ    cosθ    0   X   Y
   * 1         0       0      1       1
   * 根据结合律结果应为：
   * 
   * cosθ    -sinθ   0       m[0]  m[2]  m[4]      arr[0]  arr[2]  arr[4]
   * sinθ    cosθ    0   X   m[1]  m[3]  m[5]  =   arr[1]  arr[3]  arr[5]
   *  0       0      1       0      0      1         0       0        1
   * 
   */
  return multiply([Math.cos(rad), Math.sin(rad), -1 * Math.sin(rad), Math.cos(rad), 0, 0], m)
}
export function scale (m, v) {
  /** 
   * 假如 X，Y 分别缩放（a, b）倍
   * X' = X * a
   * Y' = Y * b
   * 
   * a    0    0       m[0]  m[2]  m[4]      arr[0]  arr[2]  arr[4]
   * 0    b    0   X   m[1]  m[3]  m[5]  =   arr[1]  arr[3]  arr[5]
   * 0    0    1       0      0      1         0       0        1
   * 
   */
  return multiply([v[0], 0, 0, v[1], 0, 0], m)
}
export function invert (m) { // 矩阵求逆
  /** 
   * 待定系数法求逆
   * X' = X * a
   * Y' = Y * b
   * 
   * m[0]  m[2]  m[4]      arr[0]  arr[2]  arr[4]       1   0   0
   * m[1]  m[3]  m[5]  *   arr[1]  arr[3]  arr[5]   =   0   1   0
   * 0      0      1         0       0        1         0   0   1
   * 
   * m[0] * arr[0] + m[2] * arr[1] + m[4] * 0 = 1    =>  arr[0] = (1 - m[2] * arr[1]) / m[0]
   * m[0] * arr[2] + m[2] * arr[3] + m[4] * 0 = 0        => arr[2] = (0 - m[2] * arr[3]) / m[0]
   * m[0] * arr[4] + m[2] * arr[5] + m[4] * 1 = 0            => arr[4] = (0 - m[2] * arr[5] - m[4]) / m[0]
   * m[1] * arr[0] + m[3] * arr[1] + m[5] * 0 = 0    =>  arr[0] = (0 - m[3] * arr[1]) / m[1]
   * m[1] * arr[2] + m[3] * arr[3] + m[5] * 0 = 1        => arr[2] = (1 - m[3] * arr[3]) / m[1]
   * m[1] * arr[4] + m[3] * arr[5] + m[5] * 1 = 0            => arr[4] = (0 - m[3] * arr[5] - m[5]) / m[1]
   */
  let arr = []
  arr[1] = 1 / m[0] / (m[2] / m[0] - m[3] / m[1])
  arr[0] = 0 - m[3] * arr[1] / m[1]
  arr[3] = 1 / m[1] / (m[3] / m[1] - m[2] / m[0])
  arr[2] = 0 - m[2] * arr[3] / m[0]
  arr[5] = (m[4] / m[0] - m[5] / m[1]) / (m[3] / m[1] - m[2] / m[0])
  arr[4] = 0 - m[3] * arr[5] - m[5] / m[1]
  return arr
}