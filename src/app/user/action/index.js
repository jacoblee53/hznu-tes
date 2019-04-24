import { action, runInAction, toJS } from 'mobx'
import { message } from 'antd'
import BaseActions from '../../../component/BaseActions'
import * as apis from '../constant/apis'
import store from '../store'
import jwt from '../../../util/token'

class UserActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  @action
  async login(params) {
    let r = await this.post(apis.API_USER_LOGIN, params, true)
    console.log(r)
    if (r.code === 200) {
      let token = r.data.token
      jwt.saveToken(token)

      const data = jwt.decodeToken()
      this.store.user = {
        id: data.id,
        role: data.role,
        classId: data.classId,
        account: data.account,
        userName: data.userName,
        token: jwt.getToken()
      }
    }
    return r
  }

  async logout() {
    this.store.user = null
    jwt.removeToken()
  }
}

export default new UserActions(store)