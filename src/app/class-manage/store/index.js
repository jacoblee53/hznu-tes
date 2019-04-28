import { observable } from 'mobx'

class Store {
  @observable classes = []
}

export default new Store()