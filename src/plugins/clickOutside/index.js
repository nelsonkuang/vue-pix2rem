export default {
  install (Vue, options = {}) {
    Vue.directive('click-outside', {
      bind (el, binding, vnode, oldVnode) {
        let onClickOutside = binding.value
        el.handler = function (e) {
          if (el && !el.contains(e.target)) {
            onClickOutside && onClickOutside(e)
          }
        }
        document.addEventListener('click', el.handler, true)
      },
      unbind (el, binding, vnode, oldVnode) {
        document.removeEventListener('click', el.handler, true)
        el.handler = null
      }
    })
  }
}
