import {
  RECORD_USER_INFO,
  DELETE_USER_INFO,
  GET_USER_INFO
} from './mutation-types.js'

import {setStore, removeStore} from '../util/tools'

export default {
  [RECORD_USER_INFO] (state, info) { // 记录用户信息
    state.userInfo = info
    state.login = true
    setStore('user_id', info.id)
  },
  [DELETE_USER_INFO] (state) { // 删除用户信息
    state.userInfo = null
    state.login = false
    removeStore('user_id')
  },
  [GET_USER_INFO] (state, info) { // 获取用户信息存入vuex
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  }
}
