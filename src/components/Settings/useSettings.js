import React, { createContext, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'

{/* This component is responsible for setttings management and it will use React Context API for this purpose */}

const initialState = {
    unit: '°C',
};

export const SettingsContext = createContext(initialState)

const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_UNIT':
        return {
            ...state,
            unit: action.payload
        };
      default:
        return state
    }
}

export function SettingsProvider({ children }) {
  return (
    <SettingsContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </SettingsContext.Provider>
  )
}

SettingsProvider.propTypes = { children: PropTypes.node.isRequired };

export default function useSettings() {
  return useContext(SettingsContext)
}