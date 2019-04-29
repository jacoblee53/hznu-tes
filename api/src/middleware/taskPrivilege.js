import User from '../model/User'

export default (req, res, next) => {
  const { owner } = req.body
  User.findOne({ _id: owner })
    .then(r => {
      if (r && r.role === 1) {
        next()
      } else {
        throw Error()
      }
    })
    .catch(e => {
      return res.status(500).json({
        code: -1,
        msg: '暂无权限',
      })
    })
}
