<template>
  <select v-model="selected" @change="() => onChange(selected)">
    <option v-for="option in options" :value="option.val" :key="option.val">
      {{ option.text }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'ASelect',
  props: {
    initSelectedVal: String,
    optionArr: Array,
    onChange: {
      type: Function,
      default: function () {
      }
    }
  },
  data () {
    return {
      selected: this.initSelectedVal,
      options: [{ text: '请选择..', val: '0' }].concat(this.optionArr)
    }
  },
  watch: {
    'optionArr': function (val, oldVal) {
      if (val !== oldVal) {
        this.options = [{ text: '请选择..', val: '0' }].concat(val)
        this.selected = '0'
      }
    },
    'initSelectedVal': function (val, oldVal) {
      if (val !== oldVal) {
        this.selected = val
      }
    }
  }
}
</script>
