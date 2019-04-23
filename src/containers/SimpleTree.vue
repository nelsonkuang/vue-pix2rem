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
      <div class="stree-container">
        <s-tree
          :data="data"
          :onChange="onChange"
          ref="myTree"
        />
      </div>
      <div class="stree-opt">
        <button @click="getVal">获取当前数据</button>
        <button @click="getSelectedVal">获取已选择的节点数据</button>
        <button @click="appendNodes">追加节点数据</button>
      </div>
    </section>
  </article>
</template>

<script>
import STree from '../components/STree'
import { goBack } from '../util/tools'

export default {
  name: 'SimpleTree',
  components: {
    STree
  },
  data () {
    return {
      msg: 'Simple Tree',
      data: [
        {
          id: '0',
          label: '线状1',
          icon: 'icon-folder',
          children: [
            {
              id: '1',
              label: '线状1-1',
              icon: 'icon-sun',
              children: []
            },
            {
              id: '2',
              label: '线状1-2',
              icon: 'icon-sun',
              children: []
            }
          ]
        },
        {
          id: '3',
          label: '线状2',
          icon: 'icon-folder',
          children: [
            {
              id: '4',
              label: '线状2-1',
              icon: 'icon-sun',
              children: []
            },
            {
              id: '5',
              label: '线状2-2',
              icon: 'icon-sun',
              children: []
            }
          ]
        },
        {
          id: '6',
          label: '线状3',
          icon: 'icon-sun',
          children: []
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    goBack: goBack,
    onChange (val) {
      console.log('---------执行onChange函数，结果如下---------')
      console.log(val)
    },
    getVal () {
      console.log('---------执行getValue函数，结果如下---------')
      console.log(this.$refs.myTree.getValue())
    },
    getSelectedVal () {
      console.log('---------执行getValue函数，结果如下---------')
      console.log(this.$refs.myTree.getSelectedValue())
    },
    appendNodes () {
      this.$refs.myTree.append([
        {
          id: '7',
          label: '线状4',
          icon: 'icon-sun',
          children: []
        },
        {
          id: '8',
          label: '线状5',
          icon: 'icon-sun',
          children: []
        }
      ])
    }
  },
  created () { },
  mounted () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="scss" scoped>
.stree-container {
  width: 200px;
  margin: 0;
  background: #434b55;
}
.stree-opt {
  padding: 50px 0;
  button {
    display: block;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    cursor: pointer;
    color: #434b55;
    background: #fff;
    &:hover {
      background: #434b55;
      color: #fff;
    }
  }
}
</style>
