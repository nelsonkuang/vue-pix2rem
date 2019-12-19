// 一个二维向量 Vector2 可以用于描述对象运动的距离及角度，多个二维向量可以描述对象的组合运动，并且组合运动可以叠加及合成等到最后的结果
/**
 * 创建一个向量
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @return {Vector2}
 */
export function create (x, y) {
  let v = []
  v[0] = x || 0
  v[1] = y || 0
  return v
}

/**
 * 向量相加
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {Vector2}
 */
export function add (v1, v2) { // 可以用于处理对象匀加速运动，或者计算组合运动后的的平行四边形对角线的长度及方向
  let v = []
  v[0] = v1[0] + v2[0]
  v[1] = v1[1] + v2[1]
  return v
}

/**
 * 向量相减
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {Vector2}
 */
export function subtract (v1, v2) { // 可以用于处理对象匀减速运动，或者计算组合运动后的三角形第三边的长度及方向
  let v = []
  v[0] = v1[0] - v2[0]
  v[1] = v1[1] - v2[1]
  return v
}

/**
 * 向量长度
 * @param {Vector2} v
 * @return {number}
 */
export function length (v) { // 可以用于计算对像运动的距离
  return Math.sqrt(v[0] ** 2 + v[1] ** 2)
}

/**
 * 向量乘法
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {Vector2}
 */
export function multiply (v1, v2) { // 可以用于处理对象线性加速
  let v = []
  v[0] = v1[0] * v2[0]
  v[1] = v1[1] * v2[1]
  return v
}

/**
 * 向量除法
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {Vector2}
 */
export function division (v1, v2) { // 可以用于处理对象线性减速
  let v = []
  v[0] = v1[0] / v2[0]
  v[1] = v1[1] / v2[1]
  return v
}

/**
 * 向量点乘
 * 参考：https://blog.csdn.net/minmindianzi/article/details/84820362
 * 点乘 dotProduct (v1, v2) > 0 方向基本相同，夹角在0°到90°之间
 * 点乘 dotProduct (v1, v2) = 0 正交，相互垂直
 * 点乘 dotProduct (v1, v2) < 0 方向基本相反，夹角在90°到180°之间  
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {number}
 */
export function dotProduct (v1, v2) { // 点乘的几何意义是可以用来表征或计算两个向量之间的夹角，以及在 b 向量在 a 向量方向上的投影，因此可以用于描述对象两次运动的方向是否相同
  return v1[0] * v2[0] + v1[1] * v2[1]
}

/**
 * 向量缩放
 * @param {Vector2} v
 * @param {number} s
 */
export function scale (v, s) {
  let v = []
  v[0] = v[0] * s
  v[1] = v[1] * s
  return v
}

/**
 * 向量归一化，这个在处理动画时经常要用到，把所有的运动都处理成 0 ~ 1 的运动过程，这样做的好处是可以很好的与 tweet 缓动函数结合制作动画
 * @param {Vector2} v
 * @return {Vector2}
 */
export function normalize (v) {
  const len = length(v) // 直角三角形的第三边最长，下面要作为分母
  let v = []
  if (len === 0) {
    v[0] = 0
    v[1] = 0
  } else {
    v[0] = v[0] / len
    v[1] = v[1] / len
  }
  return v
}

/**
 * 计算向量间距离，即求两向量组成的三角形的第三边的长度，可以用于测量 / 计算两个物体运动后两者之间的距离
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @return {number}
 */
export function distance (v1, v2) {
  return Math.sqrt(
    (v1[0] - v2[0]) ** 2
    + (v1[1] - v2[1]) ** 2
  )
}

/**
 * 求负向量
 * @param {Vector2} v
 * @return {Vector2}
 */
export function negate (v) {
  return [-v[0], -v[1]]
}

/**
 * 插值两个点。缓动动画时，对象由 0 ~ 1 运动时，这里 percent 用于描述对象运动的中途的某个值或者叫百分比
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @param {number} percent
 * @return {Vector2}
 */
export function lerp (v1, v2, percent) { // 沿用行内的线性插值名称 lerp
  let v = []
  v[0] = v1[0] + percent * (v2[0] - v1[0])
  v[1] = v1[1] + percent * (v2[1] - v1[1])
  return v
}

/**
 * 矩阵左乘向量，让对象应用 transform 可以显示 transform 后的二维线性变换后效果
 * @param {Vector2} v
 * @param {Vector2} m
 * @return {Vector2}
 */
export function applyTransform (v, m) {
  /**
   * 
   * m[0]  m[2]  m[4]     v[0]      v2[0]
   * m[1]  m[3]  m[5]  X  v[1]  =   v2[1]
   * 0      0      1        1        1
   * 
   */
  let v2 = []
  v2[0] = m[0] * v[0] + m[2] * v[1] + m[4]
  v2[1] = m[1] * v[0] + m[3] * v[1] + m[5]
  return v2
}

/**
 * 求两个向量最小值
 * @param  {Vector2} v1
 * @param  {Vector2} v2
 * @return {Vector2}
 */
export function min (v1, v2) {
  let v = []
  v[0] = Math.min(v1[0], v2[0])
  v[1] = Math.min(v1[1], v2[1])
  return v
}

/**
 * 求两个向量最大值
 * @param  {Vector2} v1
 * @param  {Vector2} v2
 * @return {Vector2}
 */
export function max (v1, v2) {
  let v = []
  v[0] = Math.max(v1[0], v2[0])
  v[1] = Math.max(v1[1], v2[1])
  return v
}