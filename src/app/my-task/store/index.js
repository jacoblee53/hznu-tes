import { observable } from 'mobx'

class Store {
  @observable myTasks = []
  @observable currentTask = {}
  @observable currentDotask = {}
}

export default new Store()