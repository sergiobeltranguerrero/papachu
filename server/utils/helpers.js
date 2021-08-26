const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const isValidToken = (req, res) => {
  const token = getTokenFrom(req)
  if (!token) {
    return res.status(401).json({
      error: 'token missing'
    }).end()
  }
  let decodedToken
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'invalid token' }).end()
    }
    if (!decoded.id) {
      return res.status(401).json({ error: 'invalid token' }).end()
    }
    decodedToken = decoded
  })
  return decodedToken
}

module.exports = isValidToken
