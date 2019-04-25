import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: { // 动态设置meta
        title: 'Home'
      },
      component: r => require.ensure([], () => r(require('@/containers/Home')), 'Home')
    },
    {
      path: '/one-scroller',
      meta: { // 动态设置meta
        title: 'One Scroller'
      },
      component: r => require.ensure([], () => r(require('@/containers/OneScroller')), 'OneScroller')
    },
    {
      path: '/modal-demo',
      meta: { // 动态设置meta
        title: 'Modal Demo'
      },
      component: r => require.ensure([], () => r(require('@/containers/ModalDemo')), 'ModalDemo')
    },
    {
      path: '/modal-demo-ii',
      meta: { // 动态设置meta
        title: 'Modal Demo II'
      },
      component: r => require.ensure([], () => r(require('@/containers/ModalDemoII')), 'ModalDemoII')
    },
    {
      path: '/address-demo',
      meta: { // 动态设置meta
        title: 'Address Demo'
      },
      component: r => require.ensure([], () => r(require('@/containers/AddressDemo')), 'AddressDemo')
    },
    {
      path: '/async-address-demo',
      meta: { // 动态设置meta
        title: 'Async Address Demo'
      },
      component: r => require.ensure([], () => r(require('@/containers/AsyncAddressDemo')), 'AsyncAddressDemo')
    },
    {
      path: '/login',
      meta: { // 动态设置meta
        title: 'Login Demo'
      },
      component: r => require.ensure([], () => r(require('@/containers/Login')), 'Login')
    },
    {
      path: '/swiper',
      meta: { // 动态设置meta
        title: 'Swiper Demo'
      },
      component: r => require.ensure([], () => r(require('@/containers/Swiper')), 'Swiper')
    },
    {
      path: '/iscroll',
      meta: { // 动态设置meta
        title: 'Iscroll Demo'
      },
      component: r => require.ensure([], () => r(require('@/containers/IscrollDemo')), 'IscrollDemo')
    },
    {
      path: '/workbench',
      meta: { // 动态设置meta
        title: 'Workbench'
      },
      component: r => require.ensure([], () => r(require('@/containers/Workbench')), 'Workbench')
    },
    {
      path: '/progress-circle',
      meta: { // 动态设置meta
        title: 'Progress Circle'
      },
      component: r => require.ensure([], () => r(require('@/containers/ProgressCircle')), 'ProgressCircle')
    },
    {
      path: '/canvas',
      meta: { // 动态设置meta
        title: 'Canvas'
      },
      component: r => require.ensure([], () => r(require('@/containers/Canvas')), 'Canvas')
    },
    {
      path: '/simple-tree',
      meta: { // 动态设置meta
        title: 'Simple Tree'
      },
      component: r => require.ensure([], () => r(require('@/containers/SimpleTree')), 'SimpleTree')
    },
    {
      path: '/render-tree-demo',
      meta: { // 动态设置meta
        title: '渲染函数 Tree Demo'
      },
      component: r => require.ensure([], () => r(require('@/containers/RenderTreeDemo')), 'RenderTreeDemo')
    }
  ]
})
