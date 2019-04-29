import { observable } from 'mobx'

class Store {
  @observable user = null
  @observable experts = []
  @observable menu = []
}

export default new Store()