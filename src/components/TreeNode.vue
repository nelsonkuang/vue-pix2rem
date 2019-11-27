<template>
  <li>
    <a
      :class="{'open': isOpen && data.children.length > 0, 'close': !isOpen && data.children.length > 0}"
      href="javascript:void(0);"
      class="name"
      @click="isOpen = !isOpen"
    >{{ data.name }}</a>
    <ul :class="{'hide': !isOpen}">
      <tree-node
        v-for="item in data.children"
        :key="item.id"
        :data="item"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          id: String(new Date().getTime() + Math.floor(9999 * Math.random())),
          name: '',
          children: []
        }
      }
    }
  },
  data () {
    return {
      isOpen: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
