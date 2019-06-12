<template>
  <article class="pageview">
    <header class="header fixed">
      <div class="container">
        <a
          class="back back_ico"
          href="javascript:void(0);"
          @click="goBack"
        /><span class="title">{{ msg }}</span>
      </div>
    </header>
    <section class="main">
      <AddressPanel
        ref="myAddress"
        :init-prov-selected-val="address.prov"
        :init-city-selected-val="address.city"
        :init-region-selected-val="address.region"
        :init-address-in-detail="address.inDetail"
      >
      </AddressPanel>
      <div :style="{textAlign:'center', marginTop:'20px'}">
        <button
          style="padding: 20px;border: 1px solid #333;border-radius: 5px;color:#333;"
          @click="getCurrentAddress"
        >点击更新到下面当前填写地址信息</button>
      </div>
      <div :style="{textAlign:'left', marginTop:'20px', padding: 20}">
        <pre style="background-color: #000;color: #fff;padding: 10px;">
          {{ JSON.stringify(currentAddress, null, 2) }}
        </pre>
      </div>
    </section>
  </article>
</template>

<script>
import AddressPanel from '../components/AddressPanel'
import { goBack } from '../util/tools'

export default {
  name: 'AddressDemo',
  components: {
    AddressPanel
  },
  data () {
    return {
      msg: '省市区地址填写',
      address: {
        prov: '0',
        city: '0',
        region: '0',
        inDetail: ''
      },
      currentAddress: {}
    }
  },
  mounted () {
    this.getCurrentAddress()
  },
  methods: {
    goBack: goBack,
    getCurrentAddress: function () {
      this.currentAddress = this.$refs['myAddress'].getCurrentAddress()
    }
  }
}
</script>
