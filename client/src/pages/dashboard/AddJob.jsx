import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
const AddJob = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    jobLocation,
    position,
    company,
    jopType,
    jobTypeOptions,
    status,
    statusOptions
  } = useAppContext()

  const handleSubmit = e => {
    e.preventDefault()

    if (!position || !company || !jobLocation) {
      displayAlert()
      return
    }
    console.log('job created')
  }

  const handleInputJob = e => {
    const name = e.target.name
    const value = e.target.value
    console.log(`${name}: ${value}`)
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>

        {showAlert && <Alert />}

        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleInputJob}
          />

          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleInputJob}
          />

          <FormRow
            labelText='Job Location'
            type='text'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleInputJob}
          />
          {/* select  status*/}
          {/* select job type */}
          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              disabled=''
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
export default AddJob
