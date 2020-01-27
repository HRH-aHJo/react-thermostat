import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import useSettings, { SettingsProvider }  from './useSettings'

{/* Testing React Hook 'useSettings' with Context API */}

test('should have default unit °C', () => {
  const wrapper = ({ children }) => <SettingsProvider unit='°C'>{children}</SettingsProvider>
  const { result } = renderHook(() => useSettings(), { wrapper })
  expect(result.current[0].unit).toBe('°C')
})

test('should set unit to °F', () => {
    const wrapper = ({ children }) => <SettingsProvider unit='°C'>{children}</SettingsProvider>
    const { result } = renderHook(() => useSettings(), { wrapper })
    act(() => {
      result.current[1]({type: 'SET_UNIT', payload: '°F'})
    })
    expect(result.current[0].unit).toBe('°F')
})