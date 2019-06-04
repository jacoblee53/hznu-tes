import { observable } from 'mobx'

class Store {
  @observable results = []
}

export default new Store()