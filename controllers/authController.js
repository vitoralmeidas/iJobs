import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, Unauthenticated } from '../errors/index.js'

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

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location
    },
    token
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

  res.status(StatusCodes.CREATED).json({ user, token, location: user.location })
}

const updateUser = async (req, res) => {
  res.send('Update User')
}

export { register, login, updateUser }