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
      <AddressPanel
        :initProvSelectedVal="address.prov"
        :initCitySelectedVal="address.city"
        :initRegionSelectedVal="address.region"
        :initAddressInDetail="address.inDetail"
        ref="myAddress"
      >
      </AddressPanel>
      <div :style="{textAlign:'center', marginTop:'20px'}">
        <button
          class="btn"
          @click="getCurrentAddress"
        >点击更新到下面当前填写地址信息</button>
        <button
          class="btn"
          style="margin-left: 20px;"
          @click="updateCurrentAddress"
          :disabled="updating"
        >{{updateBtnText}}</button>
      </div>
      <div :style="{textAlign:'left', marginTop:'20px', padding: 20}">
        <pre style="background-color: #000;color: #fff;padding: 10px;">
          {{JSON.stringify(currentAddress, null, 2)}}
        </pre>
      </div>
      <!--加载中-->
      <div
        class="spinner spinner-gritcode spinner-md"
        v-if="loading"
      >
        <div class="spinner-wrapper">
          <div class="spinner-circle"></div>
          <div class="spinner-text">加载中...</div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import AddressPanel from '../components/AddressPanel'
import { goBack } from '../util/tools'
import { fetchAddress, updateAddress } from '../service'

export default {
  name: 'AsyncAddressDemo',
  data () {
    return {
      msg: '省市区地址填写 二',
      loading: false,
      updateBtnText: '保存',
      updating: false,
      address: {
        prov: '0',
        city: '0',
        region: '0',
        inDetail: ''
      },
      currentAddress: {}
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  mounted () {
    this.getCurrentAddress()
  },
  components: {
    AddressPanel
  },
  methods: {
    goBack: goBack,
    getCurrentAddress: function () {
      this.currentAddress = this.$refs['myAddress'].getCurrentAddress()
    },
    updateCurrentAddress: function () {
      this.currentAddress = this.$refs['myAddress'].getCurrentAddress()
      this.updating = true
      this.updateBtnText = '保存中...'
      updateAddress({
        prov: this.currentAddress.prov.val,
        city: this.currentAddress.city.val,
        region: this.currentAddress.region.val,
        inDetail: this.currentAddress.inDetail
      }).then(() => {
        this.updateBtnText = '保存成功!'
      }).then(() => {
        setTimeout(() => {
          this.updateBtnText = '保存'
          this.updating = false
        }, 1000)
      }).catch(e => {
        console.log(e.message)
        this.updateBtnText = '保存失败!'
        setTimeout(() => {
          this.updateBtnText = '保存'
          this.updating = false
        }, 1000)
      })
    },
    fetchData: function () {
      this.loading = true
      fetchAddress().then(res => {
        this.address = {
          ...this.address,
          ...res
        }
        this.loading = false
      }).then(() => {
        this.getCurrentAddress()
      }).catch(e => {
        console.log(e.message)
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../style/pix2rem/index";
.btn {
  padding: 10px;
  border: 1px solid #333;
  border-radius: 5px;
  color: #333;
  background-color: #fff;
  &:active {
    background-color: #999;
    color: #fff;
  }
  &:disabled {
    border-color: #666;
    background-color: #999;
    color: #fff;
  }
}
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
