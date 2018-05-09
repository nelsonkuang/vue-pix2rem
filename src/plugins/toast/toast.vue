<template>
  <div class="toast">
   <div class="toast__mask" v-show="isShowMask"></div>
   <transition :name="translate">
    <div class="toast__box" :class="position" v-show="show">
      <i :class="'toast__icon ' + icon" v-show="isShowIcon"></i>
      <div class="toast__text">{{text}}</div>
    </div>
   </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timer: null
    }
  },
  props: {
    show: {
      // 是否显示此toast
      default: false
    },
    text: {
      // 提醒文字
      default: 'loading'
    },
    position: {
      // 提醒容器位置
      default: 'center'
    },
    isShowMask: {
      // 是否显示遮罩层
      default: false
    },
    time: {
      // 显示时间
      default: 1500
    },
    transition: {
      // 是否开启动画
      default: true
    },
    icon: {
      type: String,
      default: ''
    },
    isShowIcon: {
      // 是否显示Icon
      default: false
    }
  },
  mounted () {},
  updated () {
    if (this.show) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.show = false
      }, this.time)
    }
  },
  computed: {
    translate () {
      // 根据props，生成相对应的动画
      if (!this.transition) {
        return ''
      } else {
        if (this.position === 'top') {
          return 'translate-top'
        } else if (this.position === 'center') {
          return 'translate-center'
        } else if (this.position === 'bottom') {
          return 'translate-bottom'
        }
      }
    },
    fadeIn () {
      // 同上
      if (!this.transition) {
        return ''
      } else {
        return 'fadeIn'
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../style/icon/weui-icon_font';
.toast__box {
  position: fixed;
  padding: 20px;
  top: 50%;
  left: 50%;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #fff;
  font-size: 16px;
  z-index: 5000;
  color: #fff;
  border-radius: 5px;
  &.top {
    top: 50px;
    transform: translate(-50%, 0);
  }
  &.center {
    top: 45%;
    transform: translate(-50%, -50%);
  }
  &.bottom {
    top: auto;
    bottom: 50px;
    transform: translate(-50%, 0);
  }
  .toast__icon {
    color: #fff;
    font-size: 55px;
  }
}
[class*=" weui-icon_"]:before, [class^=weui-icon_]:before {
    margin: 0;
}
.toast__mask {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 4999;
}
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.3s;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
.translate-top-enter-active,
.translate-top-leave-active {
  transition: all 0.3s ease-out;
}
.translate-top-enter,
.translate-top-leave-to {
  transform: translate(-50%, -50px) !important;
  opacity: 0;
}
.translate-center-enter-active,
.translate-center-leave-active {
  transition: all 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);
}
.translate-center-enter,
.translate-center-leave-to {
  opacity: 0;
}
.translate-bottom-enter-active,
.translate-bottom-leave-active {
  transition: all 0.3s ease-out;
}
.translate-bottom-enter,
.translate-bottom-leave-to {
  transform: translate(-50%, 50px) !important;
  opacity: 0.20;
}
</style>
