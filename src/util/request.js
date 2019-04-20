import axios from 'axios'
import { message } from 'antd'

export default(url, options = {}, allRes = false) => {
  return axios({
    url,
    ...options
  })
  .then(r => {
    if (allRes) {
      return r.data
    }

    if (r.data.code === 200) {
      return r.data.data
    }
  })
  .catch(e => {
    message.error(e.response.data.msg)
    return e.response.data
  })
}