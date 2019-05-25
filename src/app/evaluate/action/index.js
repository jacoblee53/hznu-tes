import { action, runInAction, toJS } from 'mobx'
import BaseActions from '../../../component/BaseActions'
import * as apis from '../constant/apis'
import store from '../store'

class EvalActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
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

}

export default new EvalActions(store)