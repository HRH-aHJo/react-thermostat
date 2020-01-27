import React from 'react'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TempChart from './TempChart'
import useSettings from '../Settings/useSettings'

{/* This test suite is responsible testing TempChart component rendering based on settings and props */}

jest.mock('../Settings/useSettings')

test('should render loading text', () => {
    useSettings.mockReturnValue([{unit: '°C'}]);
    const { container } = render(<TempChart isLoading={true} />);
    expect(container).toHaveTextContent('Loading ...')
});

test('should render error text', () => {
    useSettings.mockReturnValue([{unit: '°C'}]);
    const { container } = render(<TempChart isLoading={false} error='Something Bad Happened!' />);
    expect(container).toHaveTextContent('Error! Something Bad Happened!')
});
