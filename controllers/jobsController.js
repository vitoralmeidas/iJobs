import Job from '../models/Job.js'
import { BadRequestError } from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'

const createJob = async (req, res) => {
  const { company, position } = req.body

  // {jobLocation ,stats, jobType} they have default values

  if (!company || !position) {
    throw new BadRequestError('Please provide all values')
  }

  // req.user.userId is coming from auth.js (middleware)
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)

  res.status(StatusCodes.CREATED).json({ job })
}

const deleteJob = async (req, res) => {
  res.status(201).send('Delete  Job')
}

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId })

  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 })
}

const updateJob = async (req, res) => {
  res.status(201).send('Update Job')
}

const showStatus = async (req, res) => {
  res.status(200).send('Show Status')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStatus }
