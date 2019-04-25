import { observable } from 'mobx'

class Store {
  @observable tasks = []
}

export default new Store()