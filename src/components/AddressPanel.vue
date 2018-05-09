<template>
  <ul>
    <li class="clearfix">
      <div class="fl a">省份</div>
      <div class="fl b">
        <ASelect
          :initSelectedVal="initProvSelectedVal"
          :optionArr="provArr"
          :onChange="onProvChange"
          class="a-select"
          id="prov_select"
          name="province" />
      </div>
    </li>
    <li class="clearfix">
      <div class="fl a">市</div>
      <div class="fl b">
        <ASelect
          :initSelectedVal="initCitySelectedVal"
          :optionArr="cityArr"
          :onChange="onCityChange"
          class="a-select"
          id="city_select"
          name="city" />
      </div>
    </li>
    <li class="clearfix">
      <div class="fl a">区/县</div>
      <div class="fl b">
        <ASelect
          :initSelectedVal="initRegionSelectedVal"
          :optionArr="regionArr"
          :onChange="onRegionChange"
          class="a-select"
          id="region_select"
          name="region" />
      </div>
    </li>
    <li class="clearfix">
      <div class="fl a">具体地址</div>
      <div class="fl b">
        <textarea id="address" name="address" class="text" v-model="addressInDetail" placeholder="请填写具体地址" required=""></textarea>
      </div>
    </li>
  </ul>
</template>

<script>
import ASelect from './ASelect'
import {getAddressArrById} from '../util/cn-addrs'

export default {
  name: 'AddressPanel',
  components: {
    ASelect
  },
  props: {
    initProvSelectedVal: String,
    initCitySelectedVal: String,
    initRegionSelectedVal: String,
    initAddressInDetail: String
  },
  data () {
    return {
      provArr: getAddressArrById('0'),
      cityArr: (this.initProvSelectedVal !== '0' && this.initProvSelectedVal !== 0) ? getAddressArrById(this.initProvSelectedVal) : [],
      regionArr: (this.initCitySelectedVal !== '0' && this.initCitySelectedVal !== 0) ? getAddressArrById(this.initCitySelectedVal) : [],
      provSelected: this.initProvSelectedVal || '0',
      citySelected: this.initCitySelectedVal || '0',
      regionSelected: this.initRegionSelectedVal || '0',
      addressInDetail: this.initAddressInDetail || ''
    }
  },
  methods: {
    onProvChange (id) {
      if (id !== '0' && id !== 0) {
        this.cityArr = getAddressArrById(id)
      } else {
        this.cityArr = []
      }
      this.provSelected = id
      this.regionArr = []
      this.citySelected = '0'
      this.regionSelected = '0'
      console.log(`Prov id : ${id}`)
    },
    onCityChange (id) {
      if (id !== '0' && id !== 0) {
        this.regionArr = getAddressArrById(id)
      } else {
        this.regionArr = []
      }
      this.citySelected = id
      this.regionSelected = '0'
      console.log(`City id : ${id}`)
    },
    onRegionChange (id) {
      this.regionSelected = id
      console.log(`Region id : ${id}`)
    },
    getCurrentAddress () {
      return {
        prov: this.provSelected !== '0' && this.provArr.length > 0 ? this.provArr.find(i => i.val === this.provSelected) : {},
        city: this.citySelected !== '0' && this.cityArr.length > 0 ? this.cityArr.find(i => i.val === this.citySelected) : {},
        region: this.regionSelected !== '0' && this.regionArr.length > 0 ? this.regionArr.find(i => i.val === this.regionSelected) : {},
        inDetail: this.addressInDetail || ''
      }
    }
  },
  watch: {
    'initProvSelectedVal': function () {
      if (this.initProvSelectedVal !== '0' && this.initProvSelectedVal !== 0) {
        this.cityArr = getAddressArrById(this.initProvSelectedVal)
      } else {
        this.cityArr = []
      }
      this.provSelected = this.initProvSelectedVal
    },
    'initCitySelectedVal': function () {
      if (this.initCitySelectedVal !== '0' && this.initCitySelectedVal !== 0) {
        this.regionArr = getAddressArrById(this.initCitySelectedVal)
      } else {
        this.regionArr = []
      }
      this.citySelected = this.initCitySelectedVal
    },
    'initRegionSelectedVal': function () {
      this.onRegionChange(this.initRegionSelectedVal)
    },
    'initAddressInDetail': function () {
      this.addressInDetail = this.initAddressInDetail || ''
    }
  }
}
</script>

<style scoped>
  ul > li {
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    background-color: white;
  }
  ul > li .a {
    width: 24.9%;
    box-sizing: border-box;
    padding-left: 10px;
    color: #333;
    line-height: 39px;
  }
  ul > li .b {
    width: 74.9%;
    box-sizing: border-box;
    padding-right: 10px;
  }
  ul > li .b > input,
  ul > li .b select,
  ul > li .b > textarea {
    width: 100%;
    color: #666;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 2px;
    -webkit-border-radius: 2px;
  }
  ul > li .b .a-select {
    background-size: 15px 10px;
  }
</style>
