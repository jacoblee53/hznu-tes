import { action, runInAction, toJS } from 'mobx'
import BaseActions from '../../../component/BaseActions'
import * as apis from '../constant/apis'
import store from '../store'

class TaskManageActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

}

export default new TaskManageActions(store)