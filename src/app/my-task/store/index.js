import { observable } from 'mobx'

class Store {
  @observable myTasks = []
  @observable currentTask = {}
  @observable currentDotask = {}
  @observable isLoading = false
}

export default new Store()