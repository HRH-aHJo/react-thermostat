import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Tooltip from '@material-ui/core/Tooltip';
import EcoIcon from '@material-ui/icons/Eco';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TempDisplay from './components/TempDisplay/TempDisplay';
import ThermostatStatus from './components/ThermostatStatus/ThermostatStatus';
import Settings from './components/Settings/Settings'
import { SettingsProvider } from './components/Settings/useSettings'

{/* This component is responsible for rendering Application, Appbar and other compoentns
    It will also provide theme and settings for other components using Context API */}

{/* This application is using material-ui for display elements */}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 0
  },
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  title: {
    flexGrow: 1
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 320
  }
}));

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [colorMode, setColorMod] = useState(false)

  const getColorMode = useCallback(() => {
    let mode = colorMode;
    if(!mode) {
      mode = prefersDarkMode ? 'dark' : 'light'
    }
    return mode;
  }, [colorMode, prefersDarkMode])

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: getColorMode(),
        },
      }),
    [getColorMode],
  );
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <ThemeProvider theme={theme}>
      <SettingsProvider>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='absolute' color='primary'>
          <Toolbar>
            <Typography
              component='h1'
              variant='h6'
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
            <Typography
              component='h1'
              variant='h6'
              noWrap
              className={classes.title}
            >
              Eco Thermostat
              <EcoIcon />
            </Typography>
            <Settings />
            <Tooltip title='Toggle light/dark theme'>
              <ToggleButton
                  value='check'
                  selected={getColorMode()==='dark'?true:false}
                  onChange={() => {
                    setColorMod(getColorMode()==='dark'?'light':'dark');
                  }}
                >
                <Brightness4Icon />
              </ToggleButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth='lg' className={classes.container}>
            <Grid container spacing={3}>
              {/* Thermostat Status */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ThermostatStatus />
                </Paper>
              </Grid>
              {/* Tempreture Chart */}
              <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                  <TempDisplay />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
      </SettingsProvider>
    </ThemeProvider>
  );
}
