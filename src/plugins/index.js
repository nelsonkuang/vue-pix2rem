import pLoading from './pLoading/pLoading'
import focus from './focus'
import clickOutside from './clickOutside'
import ripple from './ripple'
import toast from './toast'
import * as filters from './filters' // global filters
const plugins = {
  // 组件
  'p-loading': pLoading
}
const directives = {
  // 指令
  focus: focus,
  'click-outside': clickOutside,
  ripple: ripple
}
export default {
  install (Vue, options = {}) {
    Object.keys(plugins).forEach(key => {
      Vue.component(key, plugins[key])
    })
    Object.keys(directives).forEach(key => {
      directives[key].install(Vue, options)
    })
    Vue.use(toast)
    // Vue.use(CommonMethods) // 这里可以加入其他通过Vue.prototype挂载的自定义函数

    // register global utility filters.
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key])
    })
  }
}
