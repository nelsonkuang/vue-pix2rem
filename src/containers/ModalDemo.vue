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
      <button
        id="show-modal"
        @click="showModal({
          showCancel: false,
          showOk: false,
          header: 'Title 0',
          body: 'I will self-destroy in 2 seconds.',
          duration: 2000
        })"
      >Show Modal 0</button>
      <br>
      <button
        id="show-modal1"
        @click="showModal({
          header: 'Title 1',
          showCancel: false,
          body: 'With OK button only.',
          okCallback: okcallback1
        })"
      >Show Modal 1</button>
      <br>
      <button
        id="show-modal2"
        @click="showModal({
          header: 'Title 2',
          body: 'With both OK and Cancel button.',
          okCallback: okcallback2,
          cancelCallback: cancelcallback2
        })"
      >Show Modal 2</button>
      <!-- use the modal component, pass in the prop -->
      <modal
        :show="modalProps.show"
        :showOk="modalProps.showOk"
        :showCancel="modalProps.showCancel"
        :okText="modalProps.okText"
        :cancelText="modalProps.cancelText"
        :header="modalProps.header"
        :body="modalProps.body"
        :okCallback="modalProps.okCallback"
        :cancelCallback="modalProps.cancelCallback"
        :duration="modalProps.duration"
      ></modal>
    </section>
  </article>
</template>

<script>
import Modal from '../components/Modal'
import { goBack, extend } from '../util/tools'
export default {
  name: 'ModalDemo',
  data () {
    return {
      msg: 'Modal Demo',
      modalProps: {
        show: false,
        showOk: true,
        showCancel: true,
        okText: 'OK',
        cancelText: 'Cancel',
        header: 'Tips',
        body: '',
        okCallback: function () {
          this.modalProps.show = false
        },
        cancelCallback: function () {
          this.modalProps.show = false
        },
        duration: 0
      }
    }
  },
  components: {
    Modal
  },
  methods: {
    goBack: goBack,
    showModal: function (options) {
      let opts = {
        showOk: true,
        showCancel: true,
        okText: 'OK',
        cancelText: 'Cancel',
        header: 'Tips',
        body: '',
        okCallback: function () {
          this.modalProps.show = false
        },
        cancelCallback: function () {
          this.modalProps.show = false
        },
        duration: 0
      }
      // reset modal component
      extend(opts, options)
      extend(this.modalProps, opts)
      this.modalProps.show = true
      if (opts.duration && opts.duration > 0) {
        setTimeout(() => {
          this.modalProps.show = false
        }, opts.duration)
      }
    },
    okcallback1: function () {
      alert('You\'ve clicked OK，from dialog 1!')
      this.modalProps.show = false
    },
    cancelcallback1: function () {
      alert('You\'ve clicked Cancel，from dialog 1!')
      this.modalProps.show = false
    },
    okcallback2: function () {
      alert('You\'ve clicked OK，from dialog 2!')
      this.modalProps.show = false
    },
    cancelcallback2: function () {
      alert('You\'ve clicked Cancel，from dialog 2!')
      this.modalProps.show = false
    }
  }
}
</script>

<style scoped>
.main {
  text-align: center;
}
button {
  text-align: center;
  margin: 30px 0;
  padding: 20px;
}
</style>
