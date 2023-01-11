import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import reducer from './reducer'

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS
} from './actions'

// checking if there's a user
// initial loading
const user = localStorage.getItem('user') // we save as JSON ...
const token = localStorage.getItem('token')
const userLocation = localStorage.getItem('location')

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token || '',
  isLoading: false,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',
  showAlert: true,
  alertType: '',
  alertText: ''
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
  }

  const registerUser = async currentUser => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser)
      console.log(response)
      const { user, token, location } = await response.data
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
          location
        }
      })
      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      console.log(error.response)
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
      {/* children is the whole application */}
      {children}
    </AppContext.Provider>
  )
}

// hook to access in every component
const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, useAppContext, initialState }
