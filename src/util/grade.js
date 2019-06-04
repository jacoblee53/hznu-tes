export const calculateGrade = function(obj) {
  if (obj) {
    obj = JSON.parse(obj)
    let values = Object.values(obj)
    let result = 0
    values.map(item => {
      result += parseFloat(item)
    })
    return result
  } else {
    return 0
  }
}