<template>
  <article class="pageview">
    <header class="header fixed">
      <div class="container">
        <a
          class="back back_ico"
          href="javascript:void(0);"
          @click="goBack"
        />
        <span class="title">{{ msg }}</span>
      </div>
    </header>
    <section class="main">
      <div
        id="amap-container"
        class="container amap-container"
      >
      </div>
    </section>
  </article>
</template>

<script>
import { goBack } from '../util/tools'

export default {
  name: 'AMapDemo',
  components: {
  },
  data () {
    return {
      msg: '高德地图 Demo'
    }
  },
  computed: {
  },
  created () { },
  mounted () {
    // eslint-disable-next-line
    let map = new AMap.Map('amap-container', {
      resizeEnable: true, // 是否监控地图容器尺寸变化
      zoom: 11 // 初始化地图层级
    })
    map.on('complete', function () {
      console.log('地图加载完成')
    })
    // eslint-disable-next-line
    AMap.plugin('AMap.Geolocation', function () {
      // eslint-disable-next-line
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000, // 超过10秒后停止定位，默认：5s
        buttonPosition: 'RB', // 定位按钮的停靠位置
        // eslint-disable-next-line
        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true // 定位成功后是否自动调整地图视野到定位点
      })
      map.addControl(geolocation)
      geolocation.getCurrentPosition(function (status, result) {
        if (status === 'complete') {
          console.log('onComplete', result)
        } else {
          console.log('onError', result)
        }
      })
    })
  },
  beforeDestroy () {
  },
  methods: {
    goBack: goBack
  },
}
</script>

<style lang="scss" scoped>
@import "../style/pix2rem/index";
.amap-container {
  width: 100%;
  height: r(1000);
}
</style>
