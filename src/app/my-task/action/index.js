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
  setCurrentTask(task) {
    this.store.currentTask = task
  }

  @action
  async fetchMyTask() {
    this.store.isLoading = true
    let r = await this.get(apis.API_FETCH_MYTASK)
    runInAction(() =>{
      this.store.myTasks = r
      this.store.isLoading = false
    })
    return r
  }

  @action
  async fetchCurrentTask(params) {
    let r = await this.get(apis.API_FETCH_TASK, params)
    runInAction(() => {
      this.store.currentTask = r
    })
    return r
  }

  @action
  async fetchCurrentDotask(params) {
    let r = await this.get(apis.API_FETCH_DOTASK, params)
    runInAction(() => {
      this.store.currentDotask = r
    })
    return r
  }
}

export default new MyTaskActions(store)