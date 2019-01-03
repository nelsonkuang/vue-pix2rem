<template>
  <article class="pageview">
    <header class="header fixed">
      <div class="container">
        <a class="back back_ico" href="javascript:void(0);" @click="goBack"></a>
        <span class="title">登    录</span>
        <div class="ctr_btns"><a class="active" id="reg" href="javascript:void(0);">注册</a></div>
      </div>
    </header>
    <section class="main login">
      <div class="login_tips">动态验证码登录，无需设置密码，更安全</div>
      <div class="login_wrap clearfix" :class="{type_code: typeCode}" id="login_wrap">
        <div class="l_item normal_login" id="normal_login">
          <div class="input_panel">
            <ul>
              <li class="hint--top  hint--error hint--rounded active" :data-hint="phoneForPswMsg">
                <i class="login_ico ph l"></i><input type="number" name="phone" v-model="phoneForPsw" id="login_name" placeholder="请输入手机号码" @blur="phoneCheck" v-focus>
              </li>
              <li class="hint--top  hint--error hint--rounded active" :data-hint="pswMsg">
                <i class="login_ico lock l"></i><input :type="eyeOpen ? 'text' : 'password'" name="password" v-model="psw" id="password" placeholder="请输入密码" @blur="pswCheck"><i class="login_ico eye r" :class="{open: eyeOpen}" id="eye" @click="toggleEye"></i>
              </li>
            </ul>
          </div>
          <div class="btns">
            <input type="submit" class="btn_red" value="登      录" id="login_btn" @click="submitPswForm">
            <div class="clearfix reg">
              <a class="fl" href="javascript:void(0);" id="switch_to_2" @click="toggleLoginType">动态验证码登录</a><a class="fr" href="javascript:void(0);">忘记密码？</a>
            </div>
            <div style="font-size: 12px;color: #ddd;margin-top: 20px;">用户名：18666666666 密码: admin</div>
          </div>
        </div>
        <div class="l_item code_login" id="code_login">
          <div class="input_panel">
            <ul>
              <li class="hint--top  hint--error hint--rounded active" :data-hint="phoneForCodeMsg">
                <i class="login_ico ph l"></i><input type="number" name="phone" v-model="phoneForCode" id="login_name_2" placeholder="请输入手机号码" @blur="phoneCheck">
                <input type="button" class="code_btn" :value="verifiedCodeBtnText" id="send_code" @click="getVerifyCode" :disabled="verifiedCodeDisabled">
              </li>
              <li class="hint--top  hint--error hint--rounded active" :data-hint="verifiedCodeMsg">
                <i class="login_ico key l"></i><input type="text" name="code" v-model="verifiedCode" id="code" placeholder="请输入验证码" @blur="verifiedCodeCheck">
              </li>
            </ul>
          </div>
          <div class="btns">
            <input type="submit" class="btn_red" value="登      录" id="login_btn_2" @click="submitCodeForm">
            <div class="clearfix reg">
              <a class="fl" href="javascript:void(0);" id="switch_to_1" @click="toggleLoginType">密码登录</a>
            </div>
            <div style="font-size: 12px;color: #ddd;margin-top: 20px;">用户名：18666666666 短信验证码: 186666</div>
          </div>
        </div>
      </div>
      <div class="others">
        <h2><span>选择其他方式登录</span></h2>
        <p>
          <a href="javascript:void(0);"><i class="login_ico qq"></i></a> <a href="javascript:void(0);"><i class="login_ico we_chat"></i></a> <a href="javascript:void(0);"><i class="login_ico weibo"></i></a>
        </p>
      </div>
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
import { mapState, mapMutations } from 'vuex' // mapActions也可以引进使用
import Modal from '../components/Modal'
import { goBack, isMobileNumber, extend } from '../util/tools'
import { userPswLogin, userCodeLogin } from '../service'
export default {
  name: 'Login',
  data () {
    return {
      typeCode: false,
      eyeOpen: false,
      phoneForPsw: '',
      phoneForPswMsg: '',
      psw: '',
      pswMsg: '',
      phoneForCode: '',
      phoneForCodeMsg: '',
      verifiedCode: '',
      verifiedCodeDisabled: false,
      verifiedCodeMsg: '',
      verifiedCodeBtnText: '获取验证码',
      codeTime: 60,
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
        onDestroy: null,
        duration: 0
      }
    }
  },
  components: {
    Modal
  },
  mounted () {
    if (this.userInfo && this.userInfo.id) {
      let _this = this
      _this.showModal({
        showCancel: false,
        showOk: false,
        header: '提示',
        body: '已登录',
        duration: 2000,
        onDestroy: function () {
          _this.$router.go(-1)
        }
      })
    }
  },
  methods: {
    // 还可以mapActions
    // mapActions(['removeTodo'])
    ...mapMutations([
      'RECORD_USER_INFO'
    ]),
    goBack: goBack,
    toggleEye () {
      this.eyeOpen = !this.eyeOpen
    },
    toggleLoginType () {
      this.typeCode = !this.typeCode
    },
    phoneCheck () {
      let passed = false
      if (!this.typeCode) {
        if (this.phoneForPsw === '') {
          this.phoneForPswMsg = '手机号码不能为空'
        } else if (!isMobileNumber(this.phoneForPsw)) {
          this.phoneForPswMsg = '请正确输入11位手机号码'
        } else {
          passed = true
        }
        setTimeout(() => {
          this.phoneForPswMsg = ''
        }, 2000)
      } else {
        if (this.phoneForCode === '') {
          this.phoneForCodeMsg = '手机号码不能为空'
        } else if (!isMobileNumber(this.phoneForCode)) {
          this.phoneForCodeMsg = '请正确输入11位手机号码'
        } else {
          passed = true
        }
        setTimeout(() => {
          this.phoneForCodeMsg = ''
        }, 2000)
      }
      return passed
    },
    pswCheck () {
      if (!this.typeCode) {
        if (this.psw === '') {
          this.pswMsg = '密码不能为空'
        }
        setTimeout(() => {
          this.pswMsg = ''
        }, 2000)
      }
    },
    verifiedCodeCheck () {
      if (this.typeCode) {
        if (this.verifiedCode === '') {
          this.verifiedCodeMsg = '短信验证码不能为空'
        }
        setTimeout(() => {
          this.verifiedCodeMsg = ''
        }, 2000)
      }
    },
    startTimer () {
      this.verifiedCodeDisabled = true
      let counter = this.codeTime
      const timer = () => {
        if (counter > 1 && counter <= this.codeTime) { // 如果不到1分钟
          counter--
          this.verifiedCodeBtnText = counter + '秒'// 写入button
          this.$apply()
          setTimeout(timer, 1000)
        } else {
          this.verifiedCodeBtnText = '重新获取' // 写入button
          this.verifiedCodeDisabled = false
        }
      }
      timer()
    },
    getVerifyCode () {
      if (this.phoneCheck()) {
        this.startTimer()
        // 这里添加发送短信验证码代码
      }
    },
    async submitPswForm () {
      if (!isMobileNumber(this.phoneForPsw)) {
        this.phoneForPswMsg = '请正确输入11位手机号码'
        setTimeout(() => {
          this.phoneForPswMsg = ''
        }, 2000)
      } else if (this.psw === '') {
        this.pswMsg = '密码不能为空'
        setTimeout(() => {
          this.pswMsg = ''
        }, 2000)
      } else {
        const userInfo = (await userPswLogin(this.phoneForPsw, this.psw))[0]
        // 如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
        if (!userInfo || !userInfo.id) {
          this.showModal({
            showCancel: false,
            showOk: false,
            header: '提示',
            body: '用户名或者密码不正确',
            duration: 2000
          })
        } else {
          let _this = this
          this.RECORD_USER_INFO(userInfo)
          this.showModal({
            showCancel: false,
            showOk: false,
            header: '提示',
            body: '登录成功',
            duration: 2000,
            onDestroy: function () {
              _this.$router.go(-1)
            }
          })
        }
      }
    },
    async submitCodeForm () {
      if (!isMobileNumber(this.phoneForCode)) {
        this.phoneForCodeMsg = '请正确输入11位手机号码'
        setTimeout(() => {
          this.phoneForCodeMsg = ''
        }, 2000)
      } else if (this.verifiedCode === '') {
        this.verifiedCodeMsg = '密码不能为空'
        setTimeout(() => {
          this.verifiedCodeMsg = ''
        }, 2000)
      } else {
        const userInfo = (await userCodeLogin(this.phoneForCode, this.verifiedCode))[0]
        // 如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
        if (!userInfo || !userInfo.id) {
          this.showModal({
            showCancel: false,
            showOk: false,
            header: '提示',
            body: '用户名或者短信验证码不正确',
            duration: 2000
          })
        } else {
          let _this = this
          this.RECORD_USER_INFO(userInfo)
          this.showModal({
            showCancel: false,
            showOk: false,
            header: '提示',
            body: '登录成功',
            duration: 2000,
            onDestroy: function () {
              _this.$router.go(-1)
            }
          })
        }
      }
    },
    showModal (options) {
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
        onDestroy: null,
        duration: 0
      }
      // reset modal component
      extend(opts, options)
      extend(this.modalProps, opts)
      this.modalProps.show = true
      if (opts.duration && opts.duration > 0) {
        setTimeout(() => {
          this.modalProps.show = false
          this.modalProps.onDestroy && this.modalProps.onDestroy()
        }, opts.duration)
      }
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import '../style/pix2rem/index';
  @import '../style/mixin';
  @import '../style/hint';

  .login_ico {
    background: url(../images/login_v2_ico.png) no-repeat;
    background-size: r(300) r(200);

    &.ph {
      @include wh(r(30), r(40));
      background-position: left bottom;
    }
    &.lock{
      @include wh(r(35), r(40));
      background-position: r(-200) bottom;
    }
    &.eye{
      @include wh(r(40), r(25));
      background-position: right bottom;
      &.open{
        background-position: right r(-125);
      }
    }
    &.qq{
      @include wh(r(100), r(100));
      background-position: left top;
    }
    &.we_chat{
      @include wh(r(100), r(100));
      background-position: r(-100) top;
    }
    &.weibo{
      @include wh(r(100), r(100));
      background-position: right top;
    }
    &.key{
      @include wh(r(38), r(38));
      background-position: r(-100) bottom;
    }
  }

  .header {
    background-color: #fcf9f1;

    .title {
      color: #333;
      font-size: r(36);
    }
    .ctr_btns {
      position: absolute;
      width: 2rem;
      height: 1.333rem;
      right: 0;
      top: 0;
      line-height: 1.333rem;
      text-align: center;
      font-size: 0.4rem;
    }
  }
  .pageview {
    background: url(../images/login_bg.jpg) no-repeat left bottom;
    background-size: 100% auto;
  }
  .login {
    margin-bottom: r(72);
    font-size: r(30);
    width:100%;
    overflow:hidden;

    .login_tips {
      font-size: r(28);
      color: #494a4d;
      background-color: #e4e2de;
      height: r(80);
      line-height: r(80);
      text-align: center;
      margin-bottom: r(80);
    }
    .login_wrap{
      width:200%;
      transition: transform 0.25s ease-out;
      -webkit-transition:-webkit-transform 0.25s ease-out;
      &.type_code{
        transform: translate3d(-50%, 0, 0);
        -webkit-transform: translate3d(-50%, 0, 0);
      }
    }
    .l_item {
      width:50%;
      box-sizing:border-box;
      padding: 0 r(80);
      float:left;
    }

    .input_panel {
    padding: 0 0 0 r(60);

      li {
        color: #434343;
        padding: r(30) r(10);
        display: block;
        position: relative;
        border-bottom: 1px solid #efefef;

        .l {
          position: absolute;
          left: r(-60);
          top: r(30);
          display: block;
        }
        .r{
          position: absolute;
          right: r(25);
          top: r(35);
          display: block;
        }
        input {
          width: 100%;
          border: none;
          vertical-align: middle;
          color: #434343;
          &#password{
            width: 80%;
          }
          &#login_name_2{
            width:60%;
          }
          &.code_btn{
            width:auto;
            border:1px solid #850d0d;
            padding: r(10) r(15);
            color:#850d0d;
            font-size: r(28);
            border-radius: r(5);
            position: absolute;
            top: r(25);
            right: 0;
            &:active{
              background-color: #592726;
              color: #fff;
            }
            &:disabled{
              border-color:#ccc;
              color:#ccc;
            }
          }
        }
      }
    }

    .btns {
      padding: r(60) 0 0 0;

      .btn_red {
        background-color: #850d0d;
        width: 100%;
        text-align: center;
        border-radius: .067rem;
        color: #fff;
        font-size: .453rem;
        padding: .36rem 0 .36rem 0;
        border: none;
        &:active{
          background-color: #592726;
        }
      }

      .reg {
        padding-top: r(40);

        a {
          font-size: r(28);
          color: #333;
        }
      }
    }

    .others {
      margin-top: r(200);

      h2 {
        margin: 0 .4rem;
        text-align: center;
        position: relative;
        font-size: r(24);
        font-weight: 400;
        color: #666;

        &:before {
          content: "";
          display: block;
          position: absolute;
          top: .2rem;
          left: r(135);
          @include wh(r(420), r(2));
          background-color: #d3d3d3;
        }

        span {
          position: relative;
          padding: 0 .36rem;
          background-color: #fbfbfb;
        }
      }

      p {
        text-align: center;
        padding-top: r(30);
        a {
          display: inline-block;
          width: r(150);
        }
        .login_ico {
          display: block;
          margin: 0 auto;
        }
      }
    }
  }

</style>
