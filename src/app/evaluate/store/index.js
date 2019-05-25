import { observable } from 'mobx'

class Store {
  @observable evals = []
}

export default new Store()