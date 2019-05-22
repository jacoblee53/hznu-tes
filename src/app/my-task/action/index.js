import { action, runInAction, toJS } from 'mobx'
import BaseActions from '../../../component/BaseActions'
import * as apis from '../constant/apis'
import store from '../store'

class MyTaskActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  @action
  async fetch() {
    let r = await this.get(apis.API_FETCH_TASK)
    runInAction(() =>{
      this.store.tasks = r
    })
    return r
  }
}

export default new MyTaskActions(store)