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
      <div
        id="menu"
        class="clearfix menu"
      >
        <node-content :nodes="data" />
      </div>
    </section>
  </article>
</template>

<script>
import { goBack } from '../util/tools'

export default {
  name: 'RenderTreeDemo',
  components: {
    NodeContent: {
      props: {
        nodes: {
          required: true
        }
      },
      render (h) {
        // const nodes = this.nodes
        function renderNode (nodes) {
          if (nodes.length > 0) {
            return h('ul', {}, nodes.map((_) => {
              return h('li', { key: _.id }, [
                h('a', {
                  'class': {
                    name: true,
                    open: _.children.length > 0
                  },
                  attrs: {
                    href: 'javascript:void(0);'
                  }
                }, [_.name])
              ].concat(
                _.children.length > 0 ? renderNode(_.children) : []
              ))
            }))
          }
        }
        return this.nodes.length > 0 ? renderNode(this.nodes) : h()
      }
    }
  },
  data () {
    return {
      msg: '渲染函数 Tree Demo',
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
  methods: {
    goBack: goBack
  },
  created () { },
  mounted () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="scss" scoped>
.hide {
  display: none !important;
}
.menu {
  /deep/ {
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
