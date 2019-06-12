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
      <div
        id="cp_container_1"
        class="cp-container"
      >
        <div
          class="cp-buffer-holder cp-gt50"
          style="display: block;"
        >
          <!-- .cp-gt50 only needed when buffer is > than 50% -->
          <div
            class="cp-buffer-1"
            style="transform: rotate(180deg);"
          ></div>
          <div
            class="cp-buffer-2"
            style="transform: rotate(3600deg);"
          ></div>
        </div>
        <div
          :class="{ 'cp-gt50' : progress > 50 }"
          class="cp-progress-holder"
          style="display: block;"
        >
          <!-- .cp-gt50 only needed when progress is > than 50% -->
          <div
            :style="'transform: rotate('+ currentDegL +'deg);'"
            class="cp-progress-1"
          ></div>
          <div
            :style="'transform: rotate('+ currentDegR +'deg);'"
            class="cp-progress-2"
          ></div>
        </div>
        <div class="cp-progress-percent">
          {{ progress }}%
        </div>
      </div>
      <div class="svg_circle">
        <svg
          width="100%"
          height="100%"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M153 334
                  C153 334 151 334 151 334
                  C151 339 153 344 156 344
                  C164 344 171 339 171 334
                  C171 322 164 314 156 314
                  C142 314 131 322 131 334
                  C131 350 142 364 156 364
                  C175 364 191 350 191 334
                  C191 311 175 294 156 294
                  C131 294 111 311 111 334
                  C111 361 131 384 156 384
                  C186 384 211 361 211 334
                  C211 300 186 274 156 274" />
        </svg>
      </div>
    </section>
  </article>
</template>

<script>
import { goBack } from '../util/tools'

export default {
  name: 'ProgressCircle',
  components: {},
  data () {
    return {
      msg: 'ProgressCircle',
      progress: 0,
      timer: null
    }
  },
  computed: {
    currentDegR () {
      return ~~(this.progress * 360 / 100)
    },
    currentDegL () {
      return this.progress > 50 ? 180 : this.currentDegR
    }
  },
  created () { },
  mounted () {
    this.timer = setInterval(() => {
      this.progress += 3
      if (this.progress >= 100) {
        this.progress = 100
        clearInterval(this.timer)
      }
    }, 200)
  },
  beforeDestroy () {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    goBack: goBack
  }
}
</script>

<style lang="scss" scoped>
.cp-container {
  position: relative;
  width: 104px; /* 200 - (2 * 48) */
  height: 104px;
  /* background: url('../images/bgr.png') 0 0;
  padding: 48px; */
  padding-top: 100px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.cp-container :focus {
  border: none;
  outline: 0;
}

.cp-buffer-1,
.cp-buffer-2,
.cp-progress-1,
.cp-progress-2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 104px;
  height: 104px;
  clip: rect(0px, 52px, 104px, 0px);
  -moz-border-radius: 52px;
  -webkit-border-radius: 52px;
  border-radius: 52px;
}

.cp-buffer-1,
.cp-buffer-2 {
  background: url("../images/buffer.png") 0 0 no-repeat;
}

/* FALLBACK for .progress
 * (24 steps starting from 1hr filled progress, Decrease second value by 104px for next step)
 * (It needs the container selector to work. Or use div)
 */

.cp-container .cp-fallback {
  background: url("../images/progress_sprite.jpg") no-repeat;
  background-position: 0 104px;
}

.cp-progress-1,
.cp-progress-2 {
  background: url("../images/progress.png") 0 0 no-repeat;
}

.cp-buffer-holder,
.cp-progress-holder,
.cp-circle-control {
  position: absolute;
  width: 104px;
  height: 104px;
}

.cp-circle-control {
  cursor: pointer;
}

.cp-buffer-holder,
.cp-progress-holder {
  clip: rect(0px, 104px, 104px, 52px);
  display: none;
}

/* This is needed when progress is greater than 50% or for fallback */

.cp-buffer-holder.cp-gt50,
.cp-progress-holder.cp-gt50,
.cp-progress-1.cp-fallback {
  clip: rect(auto, auto, auto, auto);
}

.cp-progress-percent {
  text-align: center;
  color: #ff1cb7;
  font-size: 20px;
  line-height: 104px;
}

.svg_circle {
  margin-top: 200px;
  height: 800px;
  width: 300px;
  overflow: hidden;
  path {
    fill: transparent;
    stroke: red;
    stroke-width: 10;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw 5s ease 3;
    animation-fill-mode: both;
    animation-iteration-count: 1;
  }
}

@keyframes draw {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
