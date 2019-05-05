import { observable } from 'mobx'

class Store {
  @observable standards = []
}

export default new Store()