import { action, runInAction, toJS } from 'mobx'
import BaseActions from '../../../component/BaseActions'
import * as apis from '../constant/apis'
import store from '../store'

class StandardManageActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  @action
  async fetch() {
    this.store.isLoading = true
    let r = await this.get(apis.API_FETCH_STANDARD)
    runInAction(() =>{
      this.store.standards = r
      this.store.isLoading = false
    })
    return r
  }

  @action
  async delete(params) {
    let r = await this.get(apis.API_DELETE_STANDARD, params)
    this.fetch()
    return r
  }

  @action
  async create(params) {
    let r = await this.post(apis.API_CREATE_STANDARD, params, true)
    this.fetch()
    return r
  }

  @action
  async update(params) {
    let r = await this.post(apis.API_UPDATE_STANDARD, params, true)
    this.fetch()
    return r
  }

  @action
  async fetchSingle(params) {
    let r = await this.get(apis.API_FETCH_SINGLE, params)
    runInAction(() =>{
      this.store.singles = r
    })
    return r
  }

  @action
  async createSingle(params) {
    let r = await this.post(apis.API_CREATE_SINGLE, params, true)
    this.fetchSingle({
      standardId: params.standardId
    })
    return r
  }

  @action
  async deleteSingle(params) {
    let r = await this.get(apis.API_DELETE_SINGLE, params)
    return r
  }

  @action
  async updateSingle(params) {
    let r = await this.post(apis.API_UPDATE_SINGLE, params, true)
    this.fetchSingle()
    return r
  }
}

export default new StandardManageActions(store)