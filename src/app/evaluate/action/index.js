import { action, runInAction, toJS } from 'mobx'
import { message } from 'antd'
import BaseActions from '../../../component/BaseActions'
import * as apis from '../constant/apis'
import store from '../store'

class EvalActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  @action
  async fethCurrentEval(params) {
    let r = await this.get(apis.API_FETCH_DOEVAL_ID, params)
    runInAction(() => {
      this.store.currentEval = r
    })
    return r
  }

  @action
  async fetch() {
    this.store.isLoading = true
    let r = await this.get(apis.API_FETCH_DOEVAL)
    runInAction(() => {
      this.store.evals = r
      this.store.isLoading = false
    })
    return r
  }

  @action
  async fetchCurrent(params) {
    let r = await this.get(apis.API_FETCH_DOEVAL_ID, params)
    runInAction(() => {
      this.store.curreneEval = r
    })
    return r
  }

  @action
  async grade(params) {
    let r = await this.post(apis.API_SUBMIT_GRADE, params)
    message.success('保存成功')
    return r
  }

}

export default new EvalActions(store)