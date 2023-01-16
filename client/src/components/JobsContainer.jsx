import Loading from './Loading'
import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Wrapper from '../assets/wrappers/JobsContainer'
import { Job } from '../components'
const JobsContainer = () => {
  const { getJobs, isLoading, jobs, pages, totalJobs } = useAppContext()

  useEffect(() => {
    getJobs()
  }, [])

  if (isLoading) {
    return <Loading center />
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map(job => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {/* pagination buttons */}
    </Wrapper>
  )
}
export default JobsContainer
