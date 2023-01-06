import React, { useContext, useState } from 'react'

const initialState = {
    isLoading: false,
    showAlert: true,
    alertText: '',
    alertType: ''
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, setState] = useState(initialState)

    return (
        <AppContext.Provider value={{ ...state }}>
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
