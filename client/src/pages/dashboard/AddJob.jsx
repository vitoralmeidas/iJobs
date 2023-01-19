import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FormRow, Alert, FormRowSelect } from '../../components'
import { useAppContext } from '../../context/appContext'
const AddJob = () => {
  const {
    isEditing,
    showAlert,
    jobLocation,
    position,
    company,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob
  } = useAppContext()

  const handleSubmit = e => {
    e.preventDefault()

    // testing
    // if (!position || !company || !jobLocation) {
    //   displayAlert()
    //   return
    // }
    if (isEditing) {
      editJob()
      return
    }
    createJob()
  }

  const handleJobInput = e => {
    handleChange({ name: e.target.name, value: e.target.value })
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
            handleChange={handleJobInput}
          />

          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />

          <FormRow
            labelText='Job Location'
            type='text'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />

          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          <FormRowSelect
            labelText='type'
            name='jobType'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              disabled=''
            >
              Submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={e => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
export default AddJob
