import React from 'react';
import { render, wait, cleanup } from '@testing-library/react';
import TempDisplay from './TempDisplay';
import { FetchMock } from '@react-mock/fetch';
import useSettings from '../Settings/useSettings'

{/* This test suite is responsible testing TempDisplay component using API mocking (react-mock/fetch) for both successful and unsuccessful calls */}

jest.mock('../Settings/useSettings')

afterEach(cleanup);

test('should print Error! Error in case of data fetch error', async () => {
  useSettings.mockReturnValue([{unit: '°C'}]);
  const { getByTestId } = render(
    <FetchMock options={{ matcher: '*', response: {status: 404, throws: new Response('Error', {status:404, statusText:'TEST ERROR!'}) } }}>
      <TempDisplay />
    </FetchMock>
  );

  await wait(() => {
      expect(getByTestId('message').textContent).toEqual('Error! Error');
  });
});

test('should print date range in case of data fetch success', async () => {
  useSettings.mockReturnValue([{unit: '°C'}]);
  const { getByTestId } = render(
    <FetchMock options={{ matcher: '*', response: 
      {
        'report_unit': 'fifteen_minutes',
        'date': '30 May - 31 May',
        'point_data': [
          {
              'id': 'ambient_temperature',
              'name': 'Ambient Temperature',
              'unit': '°C',
              'graph_data': [
                {
                    'x': '2019-05-30T00:00:00-04:00',
                    'actual': 23.42
                }
        ]
          },
          {
              'id': 'outdoor_temperature',
              'name': 'Outdoor Temperature',
              'unit': '°C',
              'graph_data': [
                {
                    'x': '2019-05-30T00:00:00-04:00',
                    'actual': 13.03
                }
              ]
          },
          {
              'id': 'target_temperature',
              'name': 'Target Temperature',
              'unit': '°C',
              'graph_data': [
                {
                    'x': '2019-05-30T00:00:00-04:00',
                    'actual': 25.5
                }
              ]
          }
        ]
      }
    }}>
      <TempDisplay />
    </FetchMock>
  );

  await wait(() => {
      expect(getByTestId('date-range').textContent).toEqual('30 May - 31 May');
  });
});