import { useState } from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import FormRow from '../../components/FormRow'
import { useAppContext } from '../../context/appContext'
import Alert from '../../components/Alert'

const Profile = () => {
  const { user, isLoading, showAlert, displayAlert, updateUser } =
    useAppContext()

  const [name, setName] = useState(user?.name)
  const [lastName, setLastName] = useState(user?.lastName)
  const [email, setEmail] = useState(user?.email)
  const [location, setLocation] = useState(user?.location)

  const handleSubmit = e => {
    e.preventDefault()
    if (!name || !lastName || !email || !location) {
      displayAlert()
      return
    }

    updateUser({ name, lastName, email, location })
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={e => setName(e.target.value)}
          />

          <FormRow
            type='text'
            name='last name'
            value={lastName}
            handleChange={e => setLastName(e.target.value)}
          />

          <FormRow
            type='text'
            name='email'
            value={email}
            handleChange={e => setEmail(e.target.value)}
          />

          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={e => setLocation(e.target.value)}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default Profile
