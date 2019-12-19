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
import * as matrix from '../util/canvas/matrix'
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
    let m4 = matrix.create()
    ctx4.fillStyle = 'red'
    ctx4.fillRect(0, 0, 250, 100)
    // translate
    m4 = matrix.translate(m4, [30, 10]) // 平移 30 10
    ctx4.setTransform(m4[0], m4[1], m4[2], m4[3], m4[4], m4[5])
    ctx4.fillStyle = 'orange'
    ctx4.fillRect(0, 0, 250, 100)
    // rotate
    m4 = matrix.rotate(m4, 30 * Math.PI / 180) // 旋转 30 度
    ctx4.setTransform(m4[0], m4[1], m4[2], m4[3], m4[4], m4[5])
    ctx4.fillStyle = 'yellow'
    ctx4.fillRect(0, 0, 250, 100)
    // scale
    m4 = matrix.scale(m4, [0.5, 0.5]) // 缩放 0.5 0.5
    ctx4.setTransform(m4[0], m4[1], m4[2], m4[3], m4[4], m4[5])
    ctx4.fillStyle = 'green'
    ctx4.fillRect(0, 0, 250, 100)
    // invert
    m4 = matrix.invert(m4)
    ctx4.setTransform(m4[0], m4[1], m4[2], m4[3], m4[4], m4[5])
    ctx4.fillStyle = 'blue'
    ctx4.fillRect(0, 0, 250, 100)
  },
  methods: {
    goBack: goBack,
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
