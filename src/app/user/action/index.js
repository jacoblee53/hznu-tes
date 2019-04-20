import { action, runInAction } from 'mobx'
import { message } from 'antd'
import BaseActions from 'component/BaseActions'
import * as apis from '../constant/apis'
import store from '../store'

class UserActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  async login(params) {
    return await this.post(apis.API_USER_LOGIN, params)
  }

  async logout(params) {

  }
}

export default new UserActions(store)