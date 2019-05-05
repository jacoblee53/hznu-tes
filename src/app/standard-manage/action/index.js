import { action, runInAction, toJS } from 'mobx'
import BaseActions from '../../../component/BaseActions'
import * as apis from '../constant/apis'
import store from '../store'

class StandardManageActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }


}

export default new StandardManageActions(store)