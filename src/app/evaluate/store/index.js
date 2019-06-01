import { observable } from 'mobx'

class Store {
  @observable evals = []
  @observable isLoading = false
  @observable currentEval = {}
}

export default new Store()