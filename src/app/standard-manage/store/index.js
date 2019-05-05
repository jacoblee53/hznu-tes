import { observable } from 'mobx'

class Store {
  @observable standards = []
  @observable singles = []
}

export default new Store()