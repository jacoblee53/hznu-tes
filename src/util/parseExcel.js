export default (data) => {
  if (data.length > 0) {
    for (var i = 0; i < data.length; i++) {
      changeObjKey(data[i], '学号', 'account')
      changeObjKey(data[i], '姓名', 'userName')
      data[i]['password'] = '123456';
    }
    return data
  }
  return [];
}

function changeObjKey(obj, oldKey, newKey) {
  if (oldKey !== newKey) {
    Object.defineProperty(obj, newKey,
      Object.getOwnPropertyDescriptor(obj, oldKey))
  }
  delete obj[oldKey]
}