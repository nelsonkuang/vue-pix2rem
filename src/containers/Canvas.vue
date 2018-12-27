<template>
  <article class="pageview">
    <header class="header fixed">
      <div class="container"><a
          class="back back_ico"
          href="javascript:void(0);"
          @click="goBack"
        ></a><span class="title">{{msg}}</span></div>
    </header>
    <section class="main">
      <canvas
        id="canvas"
        class="canvas"
        ref="canvas"
        width="413"
        height="374"
      ></canvas>

      <canvas
        id="canvas_2"
        class="canvas_2"
        ref="canvas_2"
        width="300"
        height="300"
      ></canvas>
    </section>
  </article>
</template>

<script>
import { goBack, preLoadImage, createRoundRectPath, drawText, drawRoundImage } from '../util/tools'
import QRCode from 'qrcode'

export default {
  name: 'Canvas',
  data () {
    return {
      msg: 'Workbench'
    }
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
  },
  components: {
  },
  computed: {
  },
  methods: {
    goBack: goBack
  }
}
</script>

<style lang="scss" scoped>
.btn {
  color: #fff;
  background-color: blueviolet;
  border-radius: 5px;
  padding: 20px;
  margin: 10px auto;
  text-align: center;
}
</style>
