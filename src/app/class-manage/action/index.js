import { action, runInAction, toJS } from 'mobx'
import { message } from 'antd'
import BaseActions from '../../../component/BaseActions'
import * as apis from '../constant/apis'
import store from '../store'

class TaskManageActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  @action
  async fetch() {
    let r = await this.get(apis.API_FETCH_CLASSES)
    runInAction(() => {
      this.store.classes = r
    })
    return r
  }

  @action
  async create(params) {
    let r = await this.post(apis.API_CREATE_CLASSES, params, true)
    this.fetch()
    return r
  }

  @action
  async delete(params) {
    let r = await this.get(apis.API_DELETE_CLASSES, params, true)
    if (r.code === 200) {
      this.fetch()
      message.success(r.msg)
    }
    return r
  }

  @action
  async import(params) {
    return await this.post(apis.API_IMPORT_STUDENTS, params, true)
  }

  @action
  async download() {
    await this.get(apis.API_DOWNLOAD_SAMPLE)
  }

  @action
  async fetchMember(params) {
    let r = await this.get(apis.API_FETCH_MEMEBER, params)
    runInAction(() => {
      this.store.currentStudents = r
    })
    return r
  }

  @action
  async addMember(params) {
    let r = await this.post(apis.API_ADD_MEMEBER, params)
    this.fetchMember({
      classId: params.classId
    })
    return r
  }

  @action
  async removeMember(params) {
    let r = await this.post(apis.API_REMOVE_MEMEBER, params)
    this.fetchMember({
      classId: params.classId
    })
    return r
  }

  @action
  async resetPwd(params) {
    let r = await this.get(apis.API_RESET_PWD, params, true)
    if (r.code === 200) {
      message.success('重置成功')
    }
    return r
  }
}

export default new TaskManageActions(store)