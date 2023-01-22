import express from 'express'
const router = express.Router()
import {
  createJob,
  deleteJob,
  getAllJobs,
  showStatus,
  updateJob
} from '../controllers/jobsController.js'
import testUser from '../middleware/testUser.js'

router.route('/').get(getAllJobs).post(testUser, createJob)
router.route('/stats').get(showStatus)
router.route('/:id').delete(testUser, deleteJob).patch(testUser, updateJob)

export default router
