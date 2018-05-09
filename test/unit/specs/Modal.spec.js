import Vue from 'vue'
import Modal from '@/components/Modal'

// 挂载元素并返回已渲染的文本的工具函数
function getRenderedText (Component, propsData) {
  const Constructor = Vue.extend(Component)
  const vm = new Constructor({ propsData: propsData }).$mount()
  return vm.$el.textContent.trim()
}

describe('Modal.vue', () => {
  it('renders correctly with different props', () => {
    expect(getRenderedText(Modal, {
      header: 'Title Text',
      body: '',
      showOk: false,
      showCancel: false
    })).toBe('Title Text')
    expect(getRenderedText(Modal, {
      header: '',
      body: 'Body Text',
      showOk: false,
      showCancel: false
    })).toBe('Body Text')
    expect(getRenderedText(Modal, {
      header: '',
      body: '',
      showOk: true,
      showCancel: false,
      okText: 'okText'
    })).toBe('okText')
    expect(getRenderedText(Modal, {
      header: '',
      body: '',
      showOk: false,
      showCancel: true,
      cancelText: 'cancelText'
    })).toBe('cancelText')
  })
})
