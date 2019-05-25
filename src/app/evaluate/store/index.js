import { observable } from 'mobx'

class Store {
  @observable evals = []
  @observable isLoading = false
}

export default new Store()