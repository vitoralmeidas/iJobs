import Loading from './Loading'
import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Wrapper from '../assets/wrappers/JobsContainer'
import Job from './Job'
import PageBtnContainer from './PageBtnContainer'
import Alert from './Alert'

const JobsContainer = () => {
  const {
    getJobs,
    isLoading,
    jobs,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    searchCompany,
    numOfPages,
    showAlert
  } = useAppContext()

  useEffect(() => {
    getJobs()
    // eslint-disable-next-line
  }, [page, search, searchType, sort, searchStatus, searchCompany])

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
      {showAlert && <Alert />}
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map(job => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {/* pagination buttons */}
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}
export default JobsContainer
