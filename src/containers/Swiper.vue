<template>
  <article class="pageview">
    <header class="header fixed">
      <div class="container"><a
          class="back back_ico"
          href="javascript:void(0);"
          @click="goBack"
        ></a><span class="title">Swiper Demo</span></div>
    </header>
    <section class="main">
      <swiper
        :options="swiperOption"
        class="my-swiper"
      >
        <swiper-slide
          v-for="slide in swiperSlides"
          :key="slide"
          class="item"
        >I'm Slide {{ slide }}</swiper-slide>
        <div
          class="swiper-pagination"
          slot="pagination"
        ></div>
      </swiper>
    </section>
  </article>
</template>

<script>
import '../style/swiper.min.css'
import { goBack } from '../util/tools'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Swiper',
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      swiperSlides: [1, 2, 3, 4, 5],
      timer: null
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    goBack: goBack
  },
  mounted () {
    this.timer = setInterval(() => {
      console.log('simulate async data')
      if (this.swiperSlides.length < 10) {
        this.swiperSlides.push(this.swiperSlides.length + 1)
      }
    }, 3000)
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
@import "../style/pix2rem/index";

.my-swiper {
  .item {
    width: 100%;
    height: r(600);
    line-height: r(600);
    text-align: center;
    color: #fff;
    &:nth-child(odd) {
      background-color: #70aefc;
    }
    &:nth-child(even) {
      background-color: #b34e4d;
    }
  }
}
</style>
