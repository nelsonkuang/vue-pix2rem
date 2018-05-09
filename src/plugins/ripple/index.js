import Ripple from './ripple.vue' // 引入vue模板

export default {
  install (Vue, options = {}) {
    Vue.directive('ripple', {
      bind (el, binding, vnode, oldVnode) {
        const { duration = 200, color = '#000' } = binding.value
        let RippleTpl = Vue.extend(Ripple) // 创建vue构造器
        let $vm = new RippleTpl() // 实例化vue实例
        // 此处使用$mount来手动开启编译。用$el来访问元素，并插入到el中
        let tpl = $vm.$mount().$el
        if (!el.classList.contains('ripple-effect')) {
          el.classList.add('ripple-effect')
        }
        el.appendChild(tpl)
        el.supportedTouch = el.ontouchstart !== undefined
        el.pressHandler = function (e) {
          const clientX = el.supportedTouch ? (e.touches[0].clientX || e.originalEvent.touches[0].clientX) : (e.clientX || e.pageX)
          const clientY = el.supportedTouch ? (e.touches[0].clientY || e.originalEvent.touches[0].clientY) : (e.clientY || e.pageY)
          const translateX = clientX - el.offsetLeft
          const translateY = clientY - el.offsetTop
          const radius = ((el.offsetWidth ** 2 + el.offsetHeight ** 2) ** 0.5) * 2
          let styles = {
            background: color,
            width: radius + 'px',
            height: radius + 'px',
            transform: 'translate(-50%, -50%) translate(' + translateX + 'px,' + translateY + 'px) ' + 'scale(0.0001, 0.0001)'
          }
          $vm.isAnimated = false
          $vm.isVisible = true
          $vm.styles = styles

          setTimeout(function () {
            styles = {...styles, transform: 'translate(-50%, -50%) translate(' + translateX + 'px,' + translateY + 'px)'}
            $vm.isAnimated = true
            $vm.styles = styles
          }, 10)
        }
        el.releaseHandler = function (e) {
          setTimeout(function () {
            $vm.isVisible = false
          }, duration)
        }
        el.addEventListener(el.supportedTouch ? 'touchstart' : 'mousedown', el.pressHandler, true)
        el.addEventListener(el.supportedTouch ? 'touchend' : 'mouseup', el.releaseHandler, true)
      },
      unbind (el, binding, vnode, oldVnode) {
        el.removeEventListener(el.supportedTouch ? 'touchstart' : 'mousedown', el.pressHandler, true)
        el.removeEventListener(el.supportedTouch ? 'touchend' : 'mouseup', el.releaseHandler, true)
        el.supportedTouch = null
        el.pressHandler = null
        el.releaseHandler = null
      }
    })
  }
}
