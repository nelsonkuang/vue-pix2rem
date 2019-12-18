<template>
  <article class="pageview">
    <header class="header fixed">
      <div class="container">
        <a
          class="back back_ico"
          href="javascript:void(0);"
          @click="goBack"
        ></a><span class="title">{{ msg }}</span>
      </div>
    </header>
    <section class="main">
      <canvas
        id="canvas"
        ref="canvas"
        class="canvas"
        width="413"
        height="374"
      ></canvas>

      <canvas
        id="canvas_2"
        ref="canvas_2"
        class="canvas_2"
        width="300"
        height="300"
      ></canvas>
      <div id="target">
        <div class="img"><img src="http://www.a4z.cn/img/miniprogramme.jpg"></div>
        <div class="desc">这是我文字这是我文字这是我文字这是我文字这是我文字这是我文完</div>
      </div>
      <div id="my-containter2">
        <canvas
          id="canvas_4"
          ref="canvas_4"
          class="canvas_4"
          width="500"
          height="500"
        ></canvas>
      </div>
    </section>
  </article>
</template>

<script>
import { goBack, preLoadImage, preLoadCrossOriginImage, createRoundRectPath, drawText, drawRoundImage, drawMultiLineText } from '../util/tools'
import QRCode from 'qrcode'

export default {
  name: 'Canvas',
  components: {
  },
  data () {
    return {
      msg: 'Workbench',
      qrcodeUrl: ''
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    let canvas = this.$refs.canvas
    let ctx = canvas.getContext('2d')
    preLoadImage('http://www.iampua.com/pui/dist/img/qxhd/heart.png', function () {
      ctx.drawImage(this, 0, 0, 413, 374)
      preLoadImage('http://Placehold.it/80/ff5500/ffffff&text=R', function () {
        ctx.save()
        const pattern = ctx.createPattern(this, 'no-repeat')
        const path = createRoundRectPath(0, 0, 80, 80, 40) // 图片pattern只能从(0, 0)开始填充
        ctx.fillStyle = pattern
        ctx.translate(10, 10)
        ctx.fill(path)
        ctx.restore()

        drawText(ctx, '使用createPattern画图片圆角', 10, canvas.height - 10)
      })
    })

    QRCode.toCanvas(this.$refs.canvas_2, 'https://www.baidu.com', { width: 300 }, (error) => {
      if (error) {
        console.error(error)
      } else {
        let canvas = this.$refs.canvas_2
        let ctx = canvas.getContext('2d')
        preLoadImage('https://Placehold.it/80/ff5500/ffffff&text=R', function () {
          drawRoundImage(ctx, this, 130, 130, 20)
        })
      }
    })

    let canvas4 = this.$refs.canvas_4
    let ctx4 = canvas4.getContext('2d')
    let m4 = this.createMatrix()
    ctx4.fillStyle = 'red'
    ctx4.fillRect(0, 0, 250, 100)
    // translate
    m4 = this.translate(m4, [30, 10])
    ctx4.setTransform(m4[0], m4[1], m4[2], m4[3], m4[4], m4[5])
    ctx4.fillStyle = 'orange'
    ctx4.fillRect(0, 0, 250, 100)
    // rotate
    m4 = this.rotate(m4, 30 * Math.PI / 180) // 旋转 60 度
    ctx4.setTransform(m4[0], m4[1], m4[2], m4[3], m4[4], m4[5])
    ctx4.fillStyle = 'yellow'
    ctx4.fillRect(0, 0, 250, 100)

  },
  methods: {
    goBack: goBack,
    createMatrix () {
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
    },
    mul (m1, m2) { // 左乘
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
    },
    translate (m, v) {
      let arr = [...m]
      arr[4] = v[0]
      arr[5] = v[1]
      return arr
    },
    rotate (m, rad) {
      /**
       * 推导公式可自行百度
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
      return this.mul([Math.cos(rad), Math.sin(rad), -1 * Math.sin(rad), Math.cos(rad), 0, 0], m)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/pix2rem/index";
.btn {
  color: #fff;
  background-color: blueviolet;
  border-radius: 5px;
  padding: 20px;
  margin: 10px auto;
  text-align: center;
}
#target {
  margin: 0 auto;
  padding: r(30);
  width: r(320);
  box-sizing: content-box;
  .img {
    width: r(320);
    img {
      width: 100%;
      vertical-align: top;
    }
  }
  .desc {
    font-size: r(27);
  }
}
</style>
