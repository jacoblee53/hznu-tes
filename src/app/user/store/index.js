import { observable } from 'mobx'

class Store {
  @observable user = null
  @observable userId = ''
}

export default new Store()