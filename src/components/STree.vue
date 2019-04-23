<template>
  <div class="stree">
    <div
      v-for="item in treeItems"
      :key="item.uid"
      class="stree-node is-root-node"
      :class="{'is-leaf': item.children.length === 0}"
    >
      <div
        class="stree-node__content"
        draggable="true"
        :class="{'is-selected': !!item.isSelected}"
        @click="toggleSelect(null, item)"
        @dragstart.stop="(e)=>handleDragStart(e, null, item)"
        @dragover.stop="(e)=>handleDragOver(e, null, item)"
        @drop.stop="(e)=>handleDrop(e, null, item)"
      >
        <i :class="item.icon" />
        <span
          class="stree-node__label"
          :class="{'hide': !!item.isInputting}"
          @dblclick="(e)=>inputting(e, null, item)"
        >{{item.label}}
        </span>
        <input
          class="stree-node__input"
          :class="{'hide': !item.isInputting}"
          :value="item.label"
          placeholder="请输入..."
          @keyup.enter="(e)=>done(e, null, item)"
          @blur="(e)=>done(e, null, item)"
        >
        <i
          class="expand-icon"
          :class="{'expanded':item.isExpanded}"
          v-if="item.children.length > 0"
          @click.stop="toggleExpanded(item)"
        />
      </div>
      <div
        class="stree-node__children"
        v-if="!!item.isExpanded"
      >
        <div
          v-for="subItem in item.children"
          :key="subItem.uid"
          class="stree-node"
          :class="{'is-leaf': subItem.children.length === 0}"
        >
          <div
            class="stree-node__content"
            draggable="true"
            :class="{'is-selected': !!subItem.isSelected}"
            @click="toggleSelect(subItem, item)"
            @dragstart.stop="(e)=>handleDragStart(e, subItem, item)"
            @dragover.stop="(e)=>handleDragOver(e, subItem, item)"
            @drop.stop="(e)=>handleDrop(e, subItem, item)"
          >
            <i :class="subItem.icon" />
            <span
              class="stree-node__label"
              :class="{'hide': !!subItem.isInputting}"
              @dblclick="(e)=>inputting(e, subItem, item)"
            >{{subItem.label}}
            </span>
            <input
              class="stree-node__input"
              :class="{'hide': !subItem.isInputting}"
              :value="subItem.label"
              placeholder="请输入..."
              @keyup.enter="(e)=>done(e, subItem, item)"
              @blur="(e)=>done(e, subItem, item)"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'STree',
  props: {
    data: {
      type: Array
    },
    onChange: {
      type: Function
    }
  },
  data () {
    return {
      treeItems: [],
      dragging: null,
      uidSeed: 0,
      isEnterKeyDown: false
    }
  },
  created () {
    this.treeItems = this.data.map((_) => {
      return {
        ..._,
        isSelected: 0,
        isExpanded: 1,
        uid: ++this.uidSeed,
        children: _.children.map((item) => {
          return {
            ...item,
            isSelected: 0,
            isExpanded: 1,
            uid: ++this.uidSeed
          }
        })
      }
    })
  },
  methods: {
    toggleSelect (subNode, node) {
      this.treeItems = this.treeItems.map((_) => {
        if (_.uid === node.uid) {
          if (!subNode) {
            return {
              ...node,
              isSelected: Number(!node.isSelected),
              children: node.children.map((item) => {
                return {
                  ...item,
                  isSelected: Number(!node.isSelected)
                }
              })
            }
          } else {
            let children = node.children.map((item) => {
              if (item.uid === subNode.uid) {
                return {
                  ...item,
                  isSelected: Number(!item.isSelected)
                }
              } else {
                return item
              }
            })
            return {
              ...node,
              isSelected: Number(children.every(i => !!i.isSelected)),
              children
            }
          }
        } else {
          return _
        }
      })
    },
    toggleExpanded (node) {
      this.treeItems = this.treeItems.map((_) => {
        if (_.uid === node.uid) {
          return {
            ...node,
            isExpanded: Number(!node.isExpanded)
          }
        } else {
          return _
        }
      })
    },
    inputting (e, subNode, node) {
      this.treeItems = this.treeItems.map((_) => {
        if (_.uid === node.uid) {
          if (!subNode) {
            return {
              ...node,
              isInputting: 1
            }
          } else {
            return {
              ...node,
              isInputting: 0,
              children: node.children.map((item) => {
                if (item.uid === subNode.uid) {
                  return {
                    ...item,
                    isInputting: 1
                  }
                } else {
                  return item
                }
              })
            }
          }
        } else {
          return _
        }
      })
      this.$nextTick(() => {
        e.target.nextElementSibling.focus()
      })
    },
    done (e, subNode, node) {
      // console.log(e)
      if (!this.isEnterKeyDown) {
        this.treeItems = this.treeItems.map((_) => {
          if (_.uid === node.uid) {
            if (!subNode) {
              return {
                ...node,
                isInputting: 0,
                label: e.target.value
              }
            } else {
              return {
                ...node,
                isInputting: 0,
                children: node.children.map((item) => {
                  if (item.uid === subNode.uid) {
                    return {
                      ...item,
                      isInputting: 0,
                      label: e.target.value
                    }
                  } else {
                    return item
                  }
                })
              }
            }
          } else {
            return _
          }
        })
        this.onChange && this.onChange(this.treeItemsVals)
      }
      if (e.code && e.code === 'Enter') {
        this.isEnterKeyDown = true
        setTimeout(() => {
          this.isEnterKeyDown = false
        }, 100)
      }
    },
    handleDragStart (e, subItem, item) {
      this.dragging = {
        subItem,
        item
      }
    },
    handleDragOver (e, subItem, item) {
      e.preventDefault()
    },
    handleDrop (e, subItem, item) {
      e.preventDefault()
      let tempArr = []
      if (!this.dragging.subItem && item.uid !== this.dragging.item.uid) {
        tempArr = this.treeItems.filter(_ => this.dragging.item.uid !== _.uid)
      } else if (!this.dragging.subItem && item.uid === this.dragging.item.uid) {
        return false
      } else if (this.dragging.subItem && item.uid === this.dragging.item.uid && !!subItem && this.dragging.subItem.uid === subItem.uid) {
        return false
      } else if (this.dragging.subItem && item.uid === this.dragging.item.uid && !subItem) {
        return false
      } else {
        if (this.dragging.item.children.length === 1) {
          tempArr = this.treeItems.filter(_ => this.dragging.item.uid !== _.uid)
        } else {
          tempArr = this.treeItems.map((_) => {
            if (this.dragging.item.uid === _.uid) {
              return {
                ..._,
                children: _.children.filter(child => child.uid !== this.dragging.subItem.uid)
              }
            } else {
              return _
            }
          })
        }
      }

      const draggingItems = this.dragging.subItem ? [this.dragging.subItem] : (this.dragging.item.children.length > 0 ? this.dragging.item.children : [this.dragging.item])
      if (subItem) {
        tempArr = tempArr.map((_) => {
          if (_.uid === item.uid) {
            let arr = _.children
            arr.splice(arr.findIndex(el => el.uid === subItem.uid) + 1, 0, ...draggingItems)
            return {
              ..._,
              children: arr
            }
          } else {
            return _
          }
        })
      } else {
        if (item.children.length > 0) {
          tempArr = tempArr.map((_) => {
            if (_.uid === item.uid) {
              return {
                ..._,
                children: _.children.concat(draggingItems)
              }
            } else {
              return _
            }
          })
        } else {
          tempArr.push(this.dragging.subItem ? this.dragging.subItem : this.dragging.item)
        }
      }
      // console.log(tempArr)
      this.treeItems = tempArr
      this.onChange && this.onChange(this.treeItemsVals)
    },
    // 供外部使用函数
    getValue () {
      return this.treeItemsVals
    },
    getSelectedValue () {
      return this.treeItemsSelectedVals
    },
    append (nodes, pid) {
      if (!pid) {
        this.treeItems = this.treeItems.concat(nodes.map((_) => {
          return {
            ..._,
            isSelected: 0,
            isExpanded: 1,
            uid: ++this.uidSeed,
            children: _.children.map((item) => {
              return {
                ...item,
                isSelected: 0,
                isExpanded: 1,
                uid: ++this.uidSeed
              }
            })
          }
        }))
      } else {
        this.treeItems = this.treeItems.map((n) => {
          if (n.id === pid) {
            return {
              ...n,
              children: n.children.concat(nodes.map((_) => {
                return {
                  ..._,
                  isSelected: 0,
                  isExpanded: 1,
                  uid: ++this.uidSeed,
                  children: []
                }
              }))
            }
          }
        })
      }
    }
  },
  computed: {
    treeItemsVals () {
      return this.treeItems.map((_) => {
        return {
          id: _.id,
          label: _.label,
          icon: _.icon,
          children: _.children.map((item) => {
            return {
              id: item.id,
              label: item.label,
              icon: item.icon,
              children: []
            }
          })
        }
      })
    },
    treeItemsSelectedVals () {
      let arr = []
      this.treeItems.forEach((_) => {
        if (_.isSelected) {
          arr.push({
            id: _.id,
            label: _.label,
            icon: _.icon,
            children: _.children.map((item) => {
              return {
                id: item.id,
                label: item.label,
                icon: item.icon,
                children: []
              }
            })
          })
        } else {
          _.children.forEach((item) => {
            item.isSelected && arr.push({
              id: item.id,
              label: item.label,
              icon: item.icon,
              children: []
            })
          })
        }
      })
      return arr
    }
  },
  watch: {
  }
}
</script>
<style lang="scss" scoped>
.hide {
  display: none;
}
.stree {
  padding: 15px 5px 15px 0;
  &-node {
    font-size: 20px;
    line-height: 48px;
    margin-bottom: 1px;
    position: relative;
    &__input {
      border: none;
      margin: 0;
      padding: 0;
      color: #fff;
      max-width: 100px;
      background: transparent;
    }
    &__content {
      cursor: pointer;
      color: #aaa;
      padding-left: 15px;
      position: relative;
      &:hover {
        color: #fff;
      }
      &.is-selected {
        color: #fff;
        background: -webkit-gradient(
          linear,
          right top,
          left top,
          from(rgba(28, 28, 28, 0)),
          to(#112fdc)
        );
        background: linear-gradient(
          270deg,
          rgba(28, 28, 28, 0) 0%,
          #112fdc 100%
        );
        background-size: 80% 48px;
        background-repeat: no-repeat;
      }
      .expand-icon {
        display: block;
        width: 48px;
        height: 48px;
        position: absolute;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAASCAYAAACjMAXnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2ZjdmODRlMS1hMDg3LWMwNGUtOWI0NS02ZmM1ODJkZTMyYmUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwQ0RGMUUyMEI0MTFFN0I0ODI5MEQxRjgxQzk3QzIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEQwQ0RGMUQyMEI0MTFFN0I0ODI5MEQxRjgxQzk3QzIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NmY3Zjg0ZTEtYTA4Ny1jMDRlLTliNDUtNmZjNTgyZGUzMmJlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZmN2Y4NGUxLWEwODctYzA0ZS05YjQ1LTZmYzU4MmRlMzJiZSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pok6h6oAAAF/SURBVHjatJQtTANBEIW3W0JCDQpFQVVgMJiicZAUgSPncAh80wSDIEiSCnKmjoAgFZAUQcBXV2CQRaGakIpLCLwlb5PJ0ru9o3uTfP3d9u3MvJlKHMeXSqlt0AIfqtyogyfwCg40HvZBEzyAWonCy2AANsCW+cCIH4IpL3ADqiUIL4I+2AQTVvlXfMgLfLEK3cDCFdADOyAx5QYjK27iHpzw9TFoBxQ/BxH4BkfgxX6hxaErcOH8YN6QiXTAtfxSO4ftAVmq/4ZsoUwsVVyWRpqkaEjzypZmiivHFHY86gWEG2JspZlziSuOwx4YU3jAi/hiBTzy+Y0jNU07rDP+aMwLTFj6PluRFjVm3OCm3PVtTO3JZMQWJDRfj2Z0o8oeN5lpi5mrecQVzRexbxHH0I0u3Z1QeJjHHDqnie6EY9ucXxunfP9nifhioYCLzayuU9xk+g5WwVnaEgkpbgXWWP5bYcCZSyRU2WctoSXfEgmduVxCz+Aza4n44keAAQB3BVZJQFr3/gAAAABJRU5ErkJggg==)
          no-repeat;
        background-size: 14px 7px;
        background-position: center center;
        right: 0;
        top: 0;
        &.expanded {
          transform: rotate(180deg);
        }
      }
    }
    &.is-leaf {
      .stree-node__content {
        padding-left: 30px;
      }
      &.is-root-node {
        .stree-node__content {
          padding-left: 15px;
        }
      }
    }
  }
  .icon-folder {
    font-style: normal;
    &::after {
      content: " ❐ ";
    }
  }
  .icon-sun::after {
    content: " ↯ ";
  }
}
</style>
