import Job from '../models/Job.js'
import { BadRequestError } from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'
const createJob = async (req, res) => {
  const { company, position } = req.body

  if (!company || !position) {
    throw new BadRequestError('Please provide all values')
  }

  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)

  res.status(StatusCodes.CREATED).json({ job })
}

const deleteJob = async (req, res) => {
  res.status(201).send('Delete  Job')
}

const getAllJobs = async (req, res) => {
  res.status(200).send('Get All Jobs')
}

const updateJob = async (req, res) => {
  res.status(201).send('Update Job')
}

const showStatus = async (req, res) => {
  res.status(200).send('Show Status')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStatus }
