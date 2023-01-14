import { initialState } from './appContext'
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGOUT_USER,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS
} from './actions'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!'
    }
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: ''
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login Successful! Redirecting...'
    }
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      alertType: 'danger',
      alertText: action.payload.msg,
      showAlert: true,
      isLoading: false
    }
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSideBar: !state.showSideBar
    }
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: '',
      jobLocation: ''
    }
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
      user: action.payload.user,
      toke: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location
    }
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      alertType: 'danger',
      isLoading: false,
      alertText: action.payload.msg,
      showAlert: true
    }
  }

  throw new Error(`no such action :${action.type}`)
}

export default reducer
