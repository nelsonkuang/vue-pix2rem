<template>
  <transition name="fade">
    <div
      v-show="show"
      class="modal-mask"
    >
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              {{ header }}
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              {{ body }}
            </slot>
          </div>

          <div
            :class="{'border-none': !showCancel && !showOk}"
            class="modal-footer"
          >
            <slot name="footer">
              <button
                v-if="showOk"
                :class="{'border-none': !showCancel===true}"
                class="modal-default-button modal-button-ok"
                @click="okCallback()"
              >
                {{ okText }}
              </button>
              <button
                v-if="showCancel"
                class="modal-default-button modal-button-cancel"
                @click="cancelCallback()"
              >
                {{ cancelText }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    showOk: {
      type: Boolean,
      default: true
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    header: {
      type: String,
      default: 'Tips'
    },
    body: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: 'OK'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    okCallback: {
      type: Function,
      default: function () {
        this.show = false
      }
    },
    cancelCallback: {
      type: Function,
      default: function () {
        this.show = false
      }
    },
    duration: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 250px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  max-width: 100%;
  box-sizing: border-box;
}
.modal-container:after {
  content: "";
  display: block;
  height: 0;
  width: 0;
  clear: both;
}
.modal-header {
  padding: 10px 20px 0;
  text-align: center;
  font-size: 16px;
}
.modal-body {
  padding: 20px;
  text-align: center;
  font-size: 14px;
}
.modal-footer {
  border-top: 1px solid #cdc7c7;
  display: -webkit-box;
  display: -moz-box;
  display: box;
  width: 100%;
}
.modal-footer button {
  -moz-box-flex: 1;
  box-flex: 1;
  -webkit-box-flex: 1;
  display: block;
  color: #999;
  text-align: center;
  padding: 15px 0px;
  text-decoration: none;
  border: none;
}
.modal-footer button:first-child {
  color: #ff8903;
  border-right: 1px solid #cdc7c7;
}
.border-none {
  border: none !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
