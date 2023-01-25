import jwt from 'jsonwebtoken'
import { Unauthenticated } from '../errors/index.js'

const auth = async (req, res, next) => {
  // check header
  console.log(req.cookies)
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new Unauthenticated('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user request object
    // req.user = payload
    const testUser = payload.userId === '63cdb1d3d4f51ac57f9d8bb3'
    req.user = { userId: payload.userId, testUser }
    next()
  } catch (error) {
    throw new Unauthenticated('Authentication invalid')
  }
}

export default auth
