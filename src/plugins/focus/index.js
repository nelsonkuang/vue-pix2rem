export default {
  install (Vue, options = {}) {
    Vue.directive('focus', {
      inserted (el, binding, vnode, oldVnode) {
        el.focus()
      },
      bind (el, binding, vnode, oldVnode) {},
      update (el, binding, vnode, oldVnode) {},
      componentUpdated (el, binding, vnode, oldVnode) {},
      unbind (el, binding, vnode, oldVnode) {}
    })
  }
}
