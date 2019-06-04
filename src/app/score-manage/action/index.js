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
  async fetchResult() {
    let r = await this.get(apis.API_FETCH_RESULT)
    runInAction(() => {
      this.store.results = r
    })
    return r
  }

}

export default new EvalActions(store)