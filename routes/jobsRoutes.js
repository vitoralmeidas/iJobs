import express from 'express'
const router = express.Router()
import {
  createJob,
  deleteJob,
  getAllJobs,
  showStatus,
  updateJob
} from '../controllers/jobsController.js'
import authenticate from '../middleware/auth.js'

router.route('/').get(getAllJobs).post(createJob)
router.route('/stats').get(showStatus)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router
