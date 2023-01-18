import Job from '../models/Job.js'
import { BadRequestError, NotFoundError } from '../errors/index.js'
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
  const { id: jobId } = req.params
  const { company, position, jobLocation } = req.body

  if (!company || !position) {
    throw new BadRequestError('Please provide all values')
  }

  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`)
  }

  // atomic operation
  // if we might have a hook this method do not trigger the hook
  // it suits better in our case
  // we do not need to declare the values to update the values
  const updatedJob = await Job.findByIdAndUpdate({ _id: jobId }, req.body, {
    new: true,
    // if the propers are not there (body) there'll be no complain
    runValidators: true
  })

  // another approach
  // job.position = position
  // job.company = company
  // job.jobLocation = jobLocation
  // await job.save()

  // check permissions

  res.status(StatusCodes.OK).json({ updatedJob })
}

const showStatus = async (req, res) => {
  res.status(200).send('Show Status')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStatus }

// using findeOneAndUpdate
