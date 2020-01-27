import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';

{/* This test suite is responsible testing App component and checking if all components has been rendered */}

afterEach(cleanup);

test('should render dashboard, app name, status box, chart box', () => {
    const { getByText } = render(<App />)
    expect(getByText('Dashboard')).toBeInTheDocument()
    expect(getByText('Eco Thermostat')).toBeInTheDocument()
    expect(getByText('Status')).toBeInTheDocument()
    expect(getByText('Chart')).toBeInTheDocument()
})