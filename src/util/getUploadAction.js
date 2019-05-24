import { API_SERVER } from '../constant/apis'

export function getUploadAction(type, taskId, userId) {
  return `${API_SERVER}/dotask/${type}/?taskId=${taskId}&userId=${userId}`
}
