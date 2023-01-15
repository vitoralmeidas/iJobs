import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import reducer from './reducer'

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR
} from './actions'

// checking if there's a user
// initial loading
const user = localStorage.getItem('user') // we save as JSON ...
const token = localStorage.getItem('token')
const userLocation = localStorage.getItem('location')

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token || '',
  userLocation: userLocation || '',
  isLoading: false,
  showAlert: true,
  alertType: '',
  alertText: '',
  showSideBar: false,
  isEditing: false,
  editJob: '',
  position: '',
  company: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
  jobLocation: userLocation || ''
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios config
  const authFetch = axios.create({
    baseURL: '/api/v1'
  })

  // interceptors
  authFetch.interceptors.request.use(
    config => {
      // Do something before request is sent
      // the job's actions will use token and updateUser too
      config.headers['Authorization'] = `Bearer ${state.token}`
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  authFetch.interceptors.response.use(
    response => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    error => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log(error.response)
      if (error.response.status === 401) {
        // if there is no token
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

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

  const setUpUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })

    try {
      const response = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
      const { user, token, location } = await response.data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText
        }
      })
      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: {
          msg: error.response.data.msg
        }
      })
    }
    clearAlert()
  }

  const toggleSideBar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const updateUser = async currentUser => {
    dispatch({ type: UPDATE_USER_BEGIN })

    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
      const { user, location, token } = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token }
      })
      addUserToLocalStorage({ user, location, token })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value }
    })
  }

  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES
    })
  }

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN })
    try {
      // I'm already updating the state... do not need to send a 'new job'
      const { position, company, jobLocation, status } = state
      await authFetch.post('/jobs', {
        position,
        company,
        jobLocation,
        status
      })
      dispatch({
        type: CREATE_JOB_SUCCESS
      })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setUpUser,
        toggleSideBar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob
      }}
    >
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
