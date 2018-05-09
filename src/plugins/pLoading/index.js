import pLoading from './pLoading.vue'
export default {
  /**
   * install function
   * @param  {Vue} Vue
   * @param  {object} options  pLoading options
   */
  install (Vue, options = {}) {
    Vue.component('p-loading', pLoading)
  }
}
