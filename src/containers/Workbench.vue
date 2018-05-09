<template>
  <article class="pageview">
    <header class="header fixed">
      <div class="container"><a class="back back_ico" href="javascript:void(0);" @click="goBack"></a><span class="title">{{msg}}</span></div>
    </header>
    <section class="main">
      <div style="text-align: center;" @click="testNextTick">Getter测试：当前用户 - {{username}} - 点击进行nextTick测试</div>
      <div class="btn" @click="topToast" v-ripple="{color:'#fff', duration: 200}">top toast</div>
      <div class="btn" @click="centerToast" v-ripple="{color:'#000', duration: 300}">center toast</div>
      <div class="btn" @click="bottomToast" v-ripple="{color:'red', duration: 400}">bottom toast</div>
      <div class="btn" @click="iconToast" v-ripple="{color:'green', duration: 500}">icon toast</div>
    </section>
  </article>
</template>

<script>
import { goBack } from '../util/tools'
import { mapGetters } from 'vuex'

export default {
  name: 'Workbench',
  data () {
    return {
      msg: 'Workbench'
    }
  },
  created () {
  },
  mounted () {
    console.log('mapGetters', this.username)
    console.log('hashTableSort', this.hashTableSort([10, 5, 2, 4, 3, 1, 0]))
    console.log('arrayDistinct', this.arrayDistinct(['ddd', 'dfdf', 'dfdfg', 'ab', '165', '48654*&^', '\'",', ' ', '', 'ab', null, false, undefined, NaN]))
    console.log('pySegSort', this.pySegSort(['我是', '不你', '那是懂', '爱', '啊', '按', '已', '呀', '选', '县', '增', 'nkj你kjdf', '1234']))
    console.log('bubbleSort', this.bubbleSort([10, 5, 2, 4, 3, 1, 0], true))
    console.log('quickSort', this.quickSort([10, 5, 2, 4, 3, 654, 0]))
    console.log('getFibonacci', this.getFibonacci(15))
  },
  components: {
  },
  computed: {
    ...mapGetters(['username'])
  },
  methods: {
    goBack: goBack,
    hashTableSort (arr) {
      let temArr = []
      let result = []
      arr.forEach(item => {
        temArr[item] = 1
      })
      temArr.forEach((item, index) => {
        if (item) {
          result.push(index)
        }
      })
      return result
    },
    arrayDistinct (arr) {
      let obj = {}
      // let result = []
      // let key
      arr.forEach(item => {
        if (obj[item]) {
          obj[item]++
        } else {
          obj[item] = 1
        }
      })
      return Object.keys(obj)
      /* for (key in obj) {
        result.push(key)
      }
      console.log(obj)
      return result */
    },
    pySegSort (arr) { // 按首字中文拼音排序
      if (!String.prototype.localeCompare) {
        return null
      }
      const letters = '*ABCDEFGHJKLMNOPQRSTWXYZ'.split('') // 注意没有IUV
      const zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('')
      const lettersLen = letters.length
      let resultArr = []
      let obj = {}
      let i = 0
      if (arr.length > 0) {
        resultArr = arr.map(item => {
          for (i = 0; i < letters.length; i++) {
            if ((!zh[i - 1] || item.localeCompare(zh[i - 1], 'zh') >= 0) && item.localeCompare(zh[i], 'zh') === -1) {
              if (i === lettersLen - 1 && !(/^[\u4E00-\u9FA5]/.test(item))) { // 如果是非中文字符开头，归类到其他
                return {
                  key: letters[0],
                  value: item
                }
              }
              return {
                key: letters[i],
                value: item
              }
            }
          }
          return {
            key: letters[0],
            value: item
          }
        })
      } else {
        return {}
      }
      resultArr.forEach(item => {
        if (!obj[item.key]) {
          obj[item.key] = []
          obj[item.key].push(item.value)
        } else {
          obj[item.key].push(item.value)
        }
      })
      return obj
    },
    testNextTick () {
      this.msg = 'nextTicking测试'
      console.log(new Date().getTime(), 'Dom还没更新，随机数：' + Math.random())
      this.$nextTick(() => {
        console.log(new Date().getTime(), 'Dom已经更新了，随机数：' + Math.random())
        this.$toast.show({
          text: 'nextTicking测试完成！请查看console',
          position: 'center'
        })
      })
    },
    topToast () {
      this.$toast.show({
        text: 'topToast测试！',
        position: 'top'
      })
    },
    centerToast () {
      this.$toast.show({
        text: 'centerToast测试！',
        position: 'center'
      })
    },
    bottomToast () {
      this.$toast.show({
        text: 'bottomToast测试！',
        position: 'bottom'
      })
    },
    iconToast () {
      this.$toast.show({
        text: 'icon Toast测试！',
        position: 'center',
        isShowIcon: true,
        icon: 'weui-icon-success-no-circle' // icon样式名参考：https://github.com/Tencent/weui/blob/master/src/style/icon/weui-font.less
      })
    },
    bubbleSort (arr, descend) {
      if (Object.prototype.toString.call(arr) !== '[object Array]') {
        return arr
      }
      if (!arr.length || arr.length < 1) {
        return []
      }
      let temArr = [...arr]
      for (let i = 0, len = temArr.length; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
          let tem = temArr[i]
          if (!descend) {
            if (temArr[i] > temArr[j]) {
              temArr[i] = temArr[j]
              temArr[j] = tem
            }
          } else {
            if (temArr[i] < temArr[j]) {
              temArr[i] = temArr[j]
              temArr[j] = tem
            }
          }
        }
      }
      return temArr
    },
    quickSort (arr) {
      if (Object.prototype.toString.call(arr) !== '[object Array]') {
        return arr
      }
      if (!arr.length || arr.length < 1) {
        return []
      }
      function qSort (array) {
        if (array.length < 2) { // 设计递归出口
          return array
        }
        let leftArr = []
        let rightArr = []
        let mid = array[0]
        for (let i = 1; i < array.length; i++) {
          if (array[i] < mid) {
            leftArr.push(array[i])
          } else {
            rightArr.push(array[i])
          }
        }
        return [].concat(qSort(leftArr), [mid], qSort(rightArr)) // 设计递归出口
      }
      return qSort([...arr])
    },
    getFibonacci (n) {
      let fibaArr = []
      let i = 0
      while (i < n) {
        if (i <= 1) {
          fibaArr.push(i)
        } else {
          fibaArr.push(fibaArr[i - 1] + fibaArr[i - 2])
        }
        i += 1
      }
      return fibaArr
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  color:#fff;
  background-color: blueviolet;
  border-radius: 5px;
  padding:20px;
  margin: 10px auto;
  text-align: center;
}
</style>
