import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import HotTubIcon from '@material-ui/icons/HotTub';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ToysIcon from '@material-ui/icons/Toys';
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

{/* This component is responsible for rendering ThermostatStats based on React Hooks */}

const textStyle = {
    marginTop: 6,
    width: '40px',
    whiteSpace: 'nowrap'
};

const useStyles = makeStyles(theme => ({
    margin: {
      marginRight: 5
    },
}));

export default function ThermostatStatus(props) {

    const [status, setStatus] = useState('off')

    useEffect(() => {
        if(props.onChange) props.onChange(status)
    }, [props, status])

    const classes = useStyles();

    const radioChangeHandler = (event) => {
        setStatus(event.currentTarget.value)
    }
    
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Status
            </Typography>
            <Container maxWidth="lg">
            <Grid container spacing={3} direction="row" justify="center" alignItems="center">
              <Grid item xs={4} sm={2}>
                <Button data-testid="off-switch" onClick={radioChangeHandler} value="off" variant="contained" color={ status === "off" ? "primary":"default"}>
                <Grid container justify = "center">
                    <ToggleOffIcon fontSize="large" className={classes.margin}/>
                    <div style={textStyle}>OFF</div>
                </Grid>
                </Button>
              </Grid>
              <Grid item xs={4} sm={2}>
              <Button data-testid="cool-switch" onClick={radioChangeHandler} value="cool" variant="contained" color={ status === "cool" ? "primary":"default"}>
                <Grid container justify = "center">
                        <AcUnitIcon fontSize="large" className={classes.margin}/>
                        <div style={textStyle}>COOL</div>
                    </Grid>
                </Button>
              </Grid>
              <Grid item xs={4} sm={2}>
              <Button data-testid="heat-switch" onClick={radioChangeHandler} value="heat" variant="contained" color={ status === "heat" ? "primary":"default"}>
                <Grid container justify = "center">
                        <HotTubIcon fontSize="large" className={classes.margin}/>
                        <div style={textStyle}>HEAT</div>
                    </Grid>
                </Button>
              </Grid>
              <Grid item xs={4} sm={2}>
              <Button data-testid="fan-switch" onClick={radioChangeHandler} value="fan" variant="contained" color={ status === "fan" ? "primary":"default"}>
                <Grid container justify = "center">
                        <ToysIcon fontSize="large" className={classes.margin}/>
                        <div style={textStyle}>FAN</div>
                    </Grid>
                </Button>
              </Grid>
              <Grid item xs={4} sm={2}>
              <Button data-testid="auto-switch" onClick={radioChangeHandler} value="auto" variant="contained" color={ status === "auto" ? "primary":"default"}>
                <Grid container justify = "center">
                        <BrightnessAutoIcon fontSize="large" className={classes.margin}/>
                        <div style={textStyle}>AUTO</div>
                    </Grid>
                </Button>
              </Grid>
            </Grid>
          </Container>
        </React.Fragment>
    )
}