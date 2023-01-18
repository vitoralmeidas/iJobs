import { Unauthenticated } from '../errors/index.js'

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === requestUser.toString()) return
  throw new Unauthenticated('Not authorized to access this route')
}

export default checkPermissions
