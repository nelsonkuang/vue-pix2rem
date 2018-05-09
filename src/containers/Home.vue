<template>
  <article class="pageview">
    <header class="header fixed">
      <div class="container"><span class="title">{{msg}}</span></div>
    </header>
    <section class="main">
      <ul>
        <li><router-link to="login">Login Demo</router-link></li>
        <li><router-link to="one-scroller">One Scroller Demo</router-link></li>
        <li><router-link to="modal-demo">Modal Demo</router-link></li>
        <li><router-link to="modal-demo-ii">Modal Demo II</router-link></li>
        <li><router-link to="address-demo">Address Demo</router-link></li>
        <li><router-link to="async-address-demo">Async Address Demo</router-link></li>
        <li><router-link to="swiper">Swiper Demo</router-link></li>
        <li><router-link to="iscroll">Iscroll Demo</router-link></li>
        <li><router-link to="progress-circle">ProgressCircle</router-link></li>
        <li><router-link to="workbench">Workbench</router-link></li>
        <li>developing...</li>
      </ul>
      <div style="text-align: center;"><a href="javascript:void(0);" style="color: #70aefc;" v-if="!!userInfo" @click="logout">退出登录，</a>欢迎用户：{{ userInfo ? userInfo.username : '游客' }}</div>
      <div style="text-align: center;margin-top:20px;">当前时间：{{now | parseTime('{y}年{m}月{d}日 {h}:{i}:{s} 星期{a}')}}</div>
      <transition name="fade">
        <div class="alert-tips" v-if="tipsOn" v-click-outside="closeTips">{{tips}}</div>
      </transition>
    </section>
  </article>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home',
      tips: '',
      tipsOn: false,
      now: new Date()
    }
  },
  beforeCreate () {
    /* console.group('beforeCreate 创建前状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el) // undefined
    console.log('%c%s', 'color:red', 'data   : ' + this.$data) // undefined
    console.log('%c%s', 'color:red', 'message: ' + this.message) */
  },
  created () {
    /* console.group('created 创建完毕状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el) // undefined
    console.log('%c%s', 'color:red', 'data   : ' + this.$data) // undefined
    console.log('%c%s', 'color:red', 'message: ' + this.message) */

    this.$on('show-tips', this.showTips)
    this.$on('close-tips', this.closeTips)
  },
  mounted () {
    /* console.group('mounted 挂载前状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el) // undefined
    console.log('%c%s', 'color:red', 'data   : ' + this.$data) // undefined
    console.log('%c%s', 'color:red', 'message: ' + this.message) */

    this.timer = setInterval(() => {
      this.now = new Date()
    }, 1000)
  },
  beforeUpdate () {
    /* console.group('beforeUpdate 更新前状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el) // undefined
    console.log('%c%s', 'color:red', 'data   : ' + this.$data) // undefined
    console.log('%c%s', 'color:red', 'message: ' + this.message) */
  },
  updated () {
    /* console.group('updated 更新完成状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el) // undefined
    console.log('%c%s', 'color:red', 'data   : ' + this.$data) // undefined
    console.log('%c%s', 'color:red', 'message: ' + this.message) */
  },
  beforeDestroy () {
    /* console.group('beforeDestroy 销毁前状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el) // undefined
    console.log('%c%s', 'color:red', 'data   : ' + this.$data) // undefined
    console.log('%c%s', 'color:red', 'message: ' + this.message) */

    clearInterval(this.timer)

    this.$off('show-tips', this.showTips)
    this.$off('close-tips', this.closeTips)
  },
  destroyed () {
    /* console.group('destroyed 销毁完成状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el) // undefined
    console.log('%c%s', 'color:red', 'data   : ' + this.$data) // undefined
    console.log('%c%s', 'color:red', 'message: ' + this.message) */
  },
  methods: {
    ...mapMutations([
      'DELETE_USER_INFO'
    ]),
    logout () {
      this.DELETE_USER_INFO()
      this.$emit('show-tips', '退出成功！')
      /* setTimeout(() => {
        this.$emit('close-tips', '退出成功！')
      }, 2000) */
    },
    closeTips () {
      this.tips = ''
      this.tipsOn = false
    },
    showTips (msg) {
      this.tips = msg
      this.tipsOn = true
    }
  },
  computed: {
    ...mapState([
      'userInfo',
      'login'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../style/pix2rem/index';
  .main {
    ul, li {
      list-style: decimal;
    }
    ul {
      padding-top: r(30);
      padding-left: r(30);
      margin-left: r(60);
      margin-right: r(60);
    }
    li{
      margin-bottom: r(30);
      border-bottom:1px solid #ddd;
    }
  }
  .alert-tips{
    position: relative;
    padding: r(20);
    margin: r(20);
    border: 1px solid #b8daff;
    border-radius: r(5);
    color: #004085;
    background-color: #cce5ff;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
