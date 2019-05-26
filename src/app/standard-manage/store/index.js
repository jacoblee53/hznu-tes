import { observable } from 'mobx'

class Store {
  @observable standards = []
  @observable singles = []
  @observable isLoading = false
}

export default new Store()