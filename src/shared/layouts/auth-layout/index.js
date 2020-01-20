import React from 'react';
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  }
}));

export const AuthLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      alignContent='center'
      justify='center'
    >
      <Grid item xs={9} sm={6}>
        {children}
      </Grid>
    </Grid>
  )
}