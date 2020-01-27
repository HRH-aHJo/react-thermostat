import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import { WindMillLoading } from 'react-loadingg'
import useSettings from '../Settings/useSettings'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import { LineChart, Tooltip, Legend, Label, ResponsiveContainer, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

{/* This component is responsible for rendering tempreture data */}

const lineColors = [
    '#332288', '#88CCEE', '#44AA99'
]

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    margin: {
        marginTop: 60
    }
}));

const TempChart = (props) => {

    const theme = useTheme();
    const [settings] = useSettings();
    const classes = useStyles();
    const message = props.error?`Error! ${props.error}`:'Loading ...'
    const messageColor = props.error?'secondary':'inherit'

    if (!props.data || !props.dataKeys || props.isLoading) {
        return (
            <React.Fragment>
                <Typography component='h2' variant='h6' color='primary' gutterBottom>
                    Chart
                </Typography>
                <WindMillLoading />
                <Typography data-testid='message' className={classes.margin} component='h6' variant='caption' color={messageColor} align='center'>
                    {message}
                </Typography>
            </React.Fragment>
        )
    }

    const convertTempreture = (tempreture, fromUnit, toUnit) => {
        if(fromUnit === '°C' && toUnit === '°F') {
            return tempreture * 9 / 5 + 32;
        } else if(fromUnit === '°F' && toUnit === '°C') {
            return (tempreture - 32) * 5 / 9;
        }
    }

    const convertData = (data, settingsUnit) => {
        if(data && data[0]) {
            if(settingsUnit === data[0].unit) {
                return data;
            } else {
                return data.map(element => {
                    let converted = [];
                    props.dataKeys.forEach(keyEntry => {
                        converted[keyEntry.key] = convertTempreture(element[keyEntry.key], element.unit, settingsUnit).toFixed(2);
                    });
                    return { ...element, ...converted };
                });
            }
        }
        return null;
    }

    // eslint-disable-next-line react/prop-types
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <Paper className={classes.paper}>
                    <div>
                        <p>{moment(label).format('DD MMM HH:mm')}</p>
                        {
                            // eslint-disable-next-line react/prop-types
                            payload.map((element, i) => {
                                var circleStyle = {
                                    padding: 0,
                                    marginRight: 5,
                                    marginTop: 5,
                                    display: 'inline-block',
                                    backgroundColor: element.stroke,
                                    borderRadius: '50%',
                                    width: 12,
                                    height: 12,
                                };
                                return (<div key={i}><span style={circleStyle} /><span style={{ display: 'inline-block', width: 40 }}>{element.value}</span> {settings.unit}</div>)
                            })
                        }
                    </div>
                </Paper>
            );
        }
        return null;
    };

    return (
        <React.Fragment>
            <Typography component='h2' variant='h6' color='primary' gutterBottom>
                Chart
        </Typography>
            <Typography data-testid='date-range' component='h6' variant='caption' color='inherit' align='center'>
                {props.dateRange}
            </Typography>
            <ResponsiveContainer>
                <LineChart
                    data={convertData(props.data, settings.unit)}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <CartesianGrid strokeDasharray='4 4' opacity='0.2' />
                    <XAxis dataKey='time' tickFormatter={timeStr => moment(timeStr).format('HH:mm')} />
                    <YAxis>
                        <Label
                            angle={270}
                            position='left'
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            {`Tempreture (${settings.unit})`}
                        </Label>
                    </YAxis>

                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }} />
                    <Legend />
                    {
                        props.dataKeys.map((element, i) => {
                            return (<Line key={i} dot={false} type='monotone' name={element.name} dataKey={element.key} stroke={lineColors[i]} />)
                        })
                    }
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

TempChart.propTypes = { 
    isLoading: PropTypes.bool,
    data: PropTypes.array,
    dataKeys: PropTypes.array,
    error: PropTypes.string,
    dateRange: PropTypes.string
};

export default TempChart