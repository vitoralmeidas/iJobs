import moment from 'moment'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import { Link } from 'react-router-dom'

const Job = ({
  _id,
  company,
  position,
  jobLocation,
  jobType,
  status,
  createdAt
}) => {
  const { deleteJob, setEditJob } = useAppContext()

  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        {/* later */}
        <footer>
          <div className='actions'>
            <Link
              to='/add-job'
              className='btn edit-btn'
              onClick={() => setEditJob(_id)}
            >
              edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteJob(_id)}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}
export default Job
