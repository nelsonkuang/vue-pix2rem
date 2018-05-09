<template>
  <article class="pageview">
    <header class="header fixed">
      <div class="container"><a class="back back_ico" href="javascript:void(0);" @click="goBack"></a><span class="title">{{msg}}</span></div>
    </header>
    <section class="main">
      <iscroll-view  @pullUp="load" @pullDown="refresh" class="scroll-view" ref="scrollView" :options="{mouseWheel:true}">
        <div style="height:1.333rem;">下拉刷新</div>
        <ul v-if="userList.length" class="list">
          <li v-for="item in userList" :key="item.id" class="item">{{item.name}}</li>
        </ul>
        <div v-show="noMoreData" style="padding:30px 0;">没有更多了...</div>
      </iscroll-view>
      <transition name="loading">
        <p-loading v-show="isLoading"></p-loading>
      </transition>
    </section>
  </article>
</template>

<script>
import Vue from 'vue'
import IScrollView from 'vue-iscroll-view'
import { goBack } from '../util/tools'
import { getUsers } from '../service'

/* Using these kinds of IScroll class for different cases. */
import IScroll from 'iscroll'
// import IScroll from 'iscroll/build/iscroll-infinite.js
// import IScroll from 'iscroll/build/iscroll-probe.js
// import IScroll from 'iscroll/build/iscroll-view.js
// import IScroll from 'iscroll/build/iscroll-zoom.js
// import IScroll from 'iscroll/build/iscroll-lite.js

Vue.use(IScrollView, IScroll)

export default {
  name: 'iscroll-demo',
  data () {
    return {
      msg: 'Iscroll Demo',
      currentPage: 1,
      isLastPage: false,
      pageLimit: 20,
      userList: [],
      isLoading: false,
      noMoreData: false
    }
  },
  created () {
  },
  mounted () {
    this.getUsersByPage(this.currentPage)
  },
  components: {
    IScrollView
  },
  methods: {
    goBack: goBack,
    refresh (iscroll) {
      // Refresh current data
      if (iscroll.distY > 200) {
        this.getUsersByPage(1, true)
        this.isLastPage = false
      }
    },
    load (iscroll) {
      // Load new data
      console.log('I will load some new data yeah!')
      if (!this.isLastPage) {
        this.getUsersByPage(++this.currentPage)
      }
    },
    getUsersByPage (page = 1, forcedUpdate = false) {
      this.isLoading = true
      getUsers(page, this.pageLimit).then(res => {
        if (forcedUpdate) {
          this.userList = [...res]
          this.currentPage = page
          this.noMoreData = false
        } else {
          if (res.length) {
            this.userList = [...this.userList, ...res]
            this.currentPage = page
          } else {
            this.noMoreData = true
            this.isLastPage = true
          }
        }
        this.isLoading = false
      }).then(() => {
        this.$refs.scrollView.refresh()
      }).catch(e => {
        console.log(e.message)
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>
.scroll-view {
  /* -- Attention: This line is extremely important in chrome 55+! -- */
  touch-action: none;
  /* -- Attention-- */
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.main {
  box-sizing: border-box;
  height: 100%;
}
.item{
  border-bottom: 1px solid #dddddd;
  padding: 20px 0;
  display: block;
}
.loading-enter-active, .loading-leave-active {
  transition: opacity 1s
}
.loading-enter, .loading-leave-active {
  opacity: 0
}
</style>
