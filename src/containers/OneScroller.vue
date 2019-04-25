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
      <div class="wrap">
        <scroller
          :scrollerTitle="vTitle"
          :itemList="vList"
        ></scroller>
      </div>
      <div :style="{textAlign:'center', marginTop:'10px', fontWeight:'700'}">{{`Selected Item: ${selectedItem.name}, value is ${selectedItem.value}`}}</div>
    </section>
  </article>
</template>

<script>
import Scroller from '../components/Scroller'
import { goBack } from '../util/tools'
export default {
  name: 'OneScroller',
  data () {
    return {
      vList: [
        { value: 1, name: 'item 1', selected: false },
        { value: 2, name: 'item 2', selected: false },
        { value: 3, name: 'item 3', selected: false },
        { value: 4, name: 'item 4', selected: true },
        { value: 5, name: 'item 5', selected: false },
        { value: 6, name: 'item 6', selected: false },
        { value: 7, name: 'item 7', selected: false },
        { value: 8, name: 'item 8', selected: false }
      ],
      vTitle: 'Please select an item',
      msg: 'One Scroller'
    }
  },
  components: {
    Scroller
  },
  methods: {
    goBack: goBack
  },
  computed: {
    selectedItem: function () {
      return this.vList.find(item => item.selected)
    }
  }
}
</script>

<style scoped>
.wrap {
  width: 300px;
  background: rgba(230, 230, 230, 0.5);
  position: relative;
}
</style>
