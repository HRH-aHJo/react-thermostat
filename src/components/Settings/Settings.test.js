import React from 'react'
import { render, fireEvent, waitForDomChange } from '@testing-library/react'
import Settings from './Settings'
import useSettings from './useSettings'

jest.mock('./useSettings')

{/* This test suite is responsible testing Settings component, state changes and element updates */}

test('should render °C opposite of default unit °F', () => {
    useSettings.mockReturnValue([{unit: '°F'}, null]);
    const { getByTestId } = render(<Settings />);
    expect(getByTestId('unit-text').textContent).toEqual('°C')
});

test('should dispatch new unit °F', () => {
    const dispatch = jest.fn();
    useSettings.mockReturnValue([{unit: '°C'}, dispatch]);
    const { getByTestId } = render(<Settings />);
    fireEvent.click(getByTestId('unit-button'))
    expect(dispatch).toBeCalledWith({type: 'SET_UNIT', payload: '°F'});
});

test('should render new unit °C', () => {
    const dispatch = jest.fn();
    useSettings.mockReturnValue([{unit: '°C'}, dispatch]);
    const { getByTestId, container } = render(<Settings />);
    fireEvent.click(getByTestId('unit-button'))
    waitForDomChange(container).then(()=> {
        const value = getByTestId('unit-text');
        expect(value.textContent).toEqual('°C');
    });
});
    

