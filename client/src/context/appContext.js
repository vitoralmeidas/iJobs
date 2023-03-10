import React, { useContext, useEffect, useReducer } from 'react'
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
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  DELETE_JOB_BEGIN,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  DELETE_JOB_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS
} from './actions'

const initialState = {
  userLoading: true,
  user: null,
  userLocation: '',
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
  jobLocation: '',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  editJobId: '',
  stats: {},
  monthlyApplications: [],
  search: '',
  searchCompany: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios config
  const authFetch = axios.create({
    baseURL: '/api/v1'
  })

  // interceptors

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

  const setUpUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })

    try {
      const response = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
      const { user, location } = await response.data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          location,
          alertText
        }
      })
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

  const logoutUser = async () => {
    await authFetch('/auth/logout')
    dispatch({ type: LOGOUT_USER })
  }

  const updateUser = async currentUser => {
    dispatch({ type: UPDATE_USER_BEGIN })

    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
      const { user, location } = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location }
      })
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

  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort, searchCompany } =
      state

    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
    if (search) {
      url = url + `&search=${search}`
    }
    if (searchCompany) {
      url = url + `&searchCompany=${searchCompany}`
    }

    dispatch({ type: GET_JOBS_BEGIN })

    try {
      const { data } = await authFetch.get(url)
      const { jobs, numOfPages, totalJobs } = data
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          numOfPages,
          totalJobs
        }
      })
    } catch (error) {
      console.log(error.response)
      // any error will be a server problem, 4xx or 5xx
      // just logout the user
      // testing
      logoutUser()
    }
    clearAlert()
  }

  const setEditJob = id => {
    dispatch({
      type: SET_EDIT_JOB,
      payload: { id }
    })
  }

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN })
    try {
      const { company, position, jobLocation, jobType, status } = state

      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status
      })
      dispatch({
        type: EDIT_JOB_SUCCESS
      })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const deleteJob = async jobId => {
    dispatch({ type: DELETE_JOB_BEGIN })
    try {
      await authFetch.delete(`/jobs/${jobId}`)
      getJobs()
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: DELETE_JOB_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })
    try {
      const { data } = await authFetch('/jobs/stats')
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications
        }
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  const changePage = page => {
    dispatch({
      type: CHANGE_PAGE,
      payload: { page }
    })
  }

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN })
    try {
      const { data } = await authFetch('/auth/getCurrentUser')
      const { user, location } = data
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, location }
      })
    } catch (error) {
      if (error.response.status === 401) return
      logoutUser()
    }
  }

  useEffect(() => {
    getCurrentUser()
    // eslint-disable-next-line
  }, [])

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
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage
      }}
    >
      {/* children is App */}
      {children}
    </AppContext.Provider>
  )
}

// hook to access in every component
const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, useAppContext, initialState }
