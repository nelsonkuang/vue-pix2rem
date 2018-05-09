import {
  getUser
} from '../service'
import {
  GET_USER_INFO
} from './mutation-types.js'

export default {
  async getUserInfo ({
    commit,
    state
  }) {
    let res = await getUser()
    commit(GET_USER_INFO, res)
  }
}
