<style lang="scss">
.ripple-effect {
  position: relative;
}

.ripple-container {
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(circle, #fff, #000);

  .ripple {
    background: #000;
    border-radius: 50%;
    height: 50px;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transform: translate(-50%, -50%);
    width: 50px;
    overflow: hidden;

    &.is-visible {
      opacity: 0.3;
    }

    &.is-animated {
      transition: transform 0.3s cubic-bezier(0, 0, 0.2, 1),
        width 0.3s cubic-bezier(0, 0, 0.2, 1),
        height 0.3s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.6s cubic-bezier(0, 0, 0.2, 1);
    }
  }
}
</style>
<template>
  <span class="ripple-container">
    <span
      :style="styles"
      :class="{'is-visible': isVisible, 'is-animated': isAnimated}"
      class="ripple"
    ></span>
  </span>
</template>
<script>
export default {
  props: {
    isAnimated: {
      type: Boolean,
      default: true
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object,
      default: null
    }
  }
}
</script>
