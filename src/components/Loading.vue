 <template>
  <div
    id="spinner-box"
    class="spinner spinner-gritcode spinner-md"
  >
    <div class="spinner-wrapper">
      <div class="spinner-circle"></div>
      <div class="spinner-text">{{msg}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    msg: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>

<style scoped>
.spinner-gritcode {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9998;
  position: absolute;
  width: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
}

.spinner-gritcode .spinner-wrapper {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spinner-gritcode .spinner-circle {
  position: relative;
  border: 4px solid #ccc;
  border-right-color: #fff;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.6s linear;
  animation-iteration-count: infinite;
  width: 6em;
  height: 6em;
  z-index: 2;
}

.spinner-gritcode.spinner-md .spinner-circle {
  width: 3em;
  height: 3em;
}

.spinner-gritcode .spinner-text {
  position: relative;
  text-align: center;
  margin-top: 0.5em;
  z-index: 2;
  width: 100%;
  font-size: 1.2em;
  color: #ccc;
}

.spinner-gritcode .spinner-text strong {
  color: #fff;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
