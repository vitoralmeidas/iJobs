import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, Unauthenticated } from '../errors/index.js'
import attachCookie from '../utils/attachCookie.js'

const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  // duplicate email
  const userAlreadyExists = await User.findOne({ email })
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use')
  }

  const user = await User.create({ name, email, password })

  const token = user.createJWT()

  attachCookie({ res, token })

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location
    }
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new Unauthenticated('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new Unauthenticated('Invalid Credentials')
  }

  const token = user.createJWT()

  // do not send the password
  user.password = undefined

  attachCookie({ res, token })

  res.status(StatusCodes.CREATED).json({ user, location: user.location })
}

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ _id: req.user.userId })

  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location

  await user.save()

  // various setups
  // in this case only id
  // if other properties included, must re-generate

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user,
    location: user.location
  })
}

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  res.status(StatusCodes.OK).json({ user, location: user.location })
}

export { register, login, updateUser, getCurrentUser }
