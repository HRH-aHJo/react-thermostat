import React from 'react'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip';
import useSettings from './useSettings'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    margin: {
      marginRight: 5,
      height: 48,
      minWidth: 50,
      border: '1px solid rgba(255, 255, 255, 0.12)'
    },
}));

{/* This component is responsible for unit setting and it will use "useSetting" hook to update the settings context */}

const Settings = () => {

    const [state, dispatch] = useSettings();
    const classes = useStyles();

    const unitChangeHandler = () => {
        dispatch({type: 'SET_UNIT', payload: state.unit==='°C'?'°F':'°C'})
    }

    return (
        <React.Fragment>
            <Tooltip title='Toggle unit'>
                <Button size='small'
                        data-testid='unit-button'
                        className={classes.margin}
                        color='inherit'
                        onClick={unitChangeHandler}
                    >
                    <div data-testid='unit-text'>{ state.unit==='°C'?'°F':'°C' }</div>
                </Button>
            </Tooltip>
        </React.Fragment>
    )
}

export default Settings