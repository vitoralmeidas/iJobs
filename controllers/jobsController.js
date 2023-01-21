import Job from '../models/Job.js'
import {
  BadRequestError,
  NotFoundError,
  Unauthenticated
} from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'
import checkPermissions from '../utils/checkPersmissions.js'
import mongoose from 'mongoose'
import moment from 'moment'

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
  const { id: jobId } = req.params

  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`)
  }

  checkPermissions(req.user, job.createdBy)

  await job.deleteOne()

  res.status(StatusCodes.OK).json({ msg: 'Success! Job deleted.' })
}

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query

  const queryObject = {
    createdBy: req.user.userId
  }
  if (status && status !== 'all') {
    queryObject.status = status
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }

  // NO AWAIT
  let result = Job.find(queryObject)

  // chain sort conditions
  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('position')
  }
  if (sort === 'z-a') {
    result = result.sort('-position')
  }

  const jobs = await result

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

  checkPermissions(req.user, job.createdBy)

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

  res.status(StatusCodes.OK).json({ updatedJob })
}

const showStatus = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ])

  // $match
  // we need to transform the userId into an ObjetcId before comparing them

  // count: {$sum: 1}
  // Expression 1 to a document will return 1,
  // since the expression will apply to each document in the group,
  //  so {$sum: 1} will return the amount of documents in the group.

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0
  }

  // working with Charts
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: '$createdAt'
          },
          month: {
            $month: '$createdAt'
          }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 }
  ])

  monthlyApplications = monthlyApplications
    .map(item => {
      const {
        _id: { year, month },
        count
      } = item
      // accepts 0-11
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y')
      return { date, count }
    })
    .reverse()
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

export { createJob, deleteJob, getAllJobs, updateJob, showStatus }
