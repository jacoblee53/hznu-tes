export default (users, size) => {
  size = parseInt(size)
  users = users.map(item => item._id)
  var al = users.length,
    rl = al * size,
    res = new Array(rl)

  for (var i = 0; i < rl; i++)
    res[i] = users[i % al]
  return res
}