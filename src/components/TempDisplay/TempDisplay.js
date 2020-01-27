import React, { Component } from 'react'
import TempChart from './TempChart';

{/* This container component is responsible for fetching data from API (for separation of concerns) and It will render TempChart component */}

const API = 'https://raw.githubusercontent.com/ParityInc/backend-assignment/master/thermostat.json'

export default class TempDisplay extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null,
      isLoading: true,
      dateRange : null,
      chartData: null,
      chartKeys: null,
      error: null,
    }
  }

  componentDidMount() {
    this.setState({ error:null, isLoading: true });
    fetch(API)
        .then( response => {
            if (!response.ok) { throw response }
            return response.json()
        })
        .then(data => {
            let chartKeys = [];
            let chartData = [];
            let dateRange = data.date;
            data.point_data.forEach(element => {
                chartKeys.push({'key': element.id, 'name': element.name});
                if(chartData.length === 0) {
                  chartData = element.graph_data.map(record => {
                      let obj = {'time': record.x, 'unit': element.unit};
                      obj[element.id] = record.actual;
                      return obj;
                    })
                } else {
                    element.graph_data.forEach(record => {
                        let chartRecord = chartData.filter(crec => {
                            return crec.time === record.x
                        });
                        if(chartRecord) {
                            chartRecord[0][element.id] = record.actual;
                        }
                    })
                }
            });
            this.setState({ data, chartData, chartKeys, dateRange, isLoading: false })
        })
        .catch( err => {
            err.text().then( error => {
                return this.setState({ error, isLoading: false })
            })
        });
  }

  render() {
    return (
      <TempChart data={this.state.chartData} dataKeys={this.state.chartKeys} dateRange={this.state.dateRange} isLoading={this.state.isLoading} error={this.state.error} />
    )
  }
}

