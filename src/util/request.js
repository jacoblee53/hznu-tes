import axios from 'axios'
import { message } from 'antd'

export default(url, options = {}, allRes = false) => {
  return axios({
    url,
    ...options
  })
  .then(r => {
    if (allRes) {
      return r
    }

    if (r.code === 200) {
      return r.data
    }
  })
  .catch(e => {
    message.error(e.msg)
  })
}