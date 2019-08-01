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
      <div id="my-containter">
        <canvas
          id="canvas_3"
          ref="canvas_3"
          class="canvas_3"
          width="288"
          height="480"
        ></canvas>
      </div>
      <img :src="qrcodeUrl">
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

    // preLoadImage('http://www.a4z.cn/img/miniprogramme.jpg', function () {
    //   setTimeout(() => {
    //     // eslint-disable-next-line
    //     html2canvas(document.querySelector('#target')).then(function (canvas) {
    //       document.querySelector('#my-containter').appendChild(canvas)
    //     })
    //   }, 2000)
    // })
    let canvas2 = this.$refs.canvas_3
    let ctx3 = canvas2.getContext('2d')
    let This = this
    preLoadCrossOriginImage('https://nuoche.51hutui.com/yisima/attachment/preview/57f4a2d50a2a45a782a913e5b544474e', function () {
      ctx3.drawImage(this, 20, 20, 248, 350)
      drawMultiLineText(ctx3, '本协议项下的任何争议，双方应友好协商解决。协商不成的，您同意将争议提交本协议签订地有管辖权的人民法院管辖', 20, 380, 150, '#000000')
      This.qrcodeUrl = canvas2.toDataURL('image/jpeg', 1)
    })
  },
  methods: {
    goBack: goBack
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
