import React, { useContext, useReducer } from 'react'
import { DISPLAY_ALERT, CLEAR_ALERT } from './actions'
import reducer from './reducer'

const initialState = {
    isLoading: false,
    showAlert: true,
    alertText: '',
    alertType: ''
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

    return (
        <AppContext.Provider value={{ ...state, displayAlert }}>
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
