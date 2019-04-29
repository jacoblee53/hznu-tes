import { action, runInAction, toJS } from 'mobx'
import BaseActions from '../../../component/BaseActions'
import * as apis from '../constant/apis'
import store from '../store'

class TaskManageActions extends BaseActions {
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

  @action
  async create(params) {
    let r = await this.post(apis.API_CREATE_TASK, params, true)
    this.fetch()
    return r
  }

  @action
  async update(params) {
    let r = await this.post(apis.API_UPDATE_TASK, params, true)
    this.fetch()
    return r
  }

  @action
  async search(params) {
    let r = await this.get(apis.API_SEARCH_TASK, params)
    runInAction(() => {
      this.store.tasks = r
    })
    return r
  }
}

export default new TaskManageActions(store)