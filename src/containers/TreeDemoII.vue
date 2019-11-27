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
        id="menu"
        class="clearfix menu"
      >
        <ul>
          <tree-node
            v-for="item in data"
            :key="item.id"
            :data="item"
          />
        </ul>
      </div>
    </section>
  </article>
</template>

<script>
import TreeNode from '../components/TreeNode'
import { goBack } from '../util/tools'

export default {
  name: 'TreeDemoII',
  components: {
    TreeNode
  },
  data () {
    return {
      msg: 'Tree Demo II',
      data: [
        {
          id: 0,
          name: '节点1',
          children: [
            {
              id: 1,
              name: '节点1-1',
              children: []
            },
            {
              id: 2,
              name: '节点1-2',
              children: [
                {
                  id: 7,
                  name: '节点1-2-1',
                  children: [
                    {
                      id: 10,
                      name: '节点1-2-1-1',
                      children: []
                    },
                    {
                      id: 11,
                      name: '节点1-2-1-2',
                      children: []
                    }
                  ]
                },
                {
                  id: 8,
                  name: '节点1-2-2',
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 3,
          name: '节点2',
          children: [
            {
              id: 4,
              name: '节点2-1',
              children: []
            },
            {
              id: 5,
              name: '节点2-2',
              children: []
            }
          ]
        },
        {
          id: 6,
          name: '节点3',
          children: []
        }
      ]
    }
  },
  computed: {
  },
  created () { },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    goBack: goBack
  },
}
</script>

<style lang="scss" scoped>
.menu {
  /deep/ {
    .hide {
      display: none !important;
    }
    a {
      color: #000;
      padding: 10px 0;
      display: block;
    }
    ul {
      padding-left: 0px;
    }
    li {
      list-style: none;
      margin-left: 30px;
      border-left: 1px dashed #000;
      .name:before {
        content: "--";
      }
      .close:after {
        content: "[+]";
        margin-left: 10px;
      }
      .open:after {
        content: "[-]";
        margin-left: 10px;
      }
    }
  }
}
</style>
