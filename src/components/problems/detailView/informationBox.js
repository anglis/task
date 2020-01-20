import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const InformationBox = ({ title, children }) => {
  if (!children) {
    return null
  }

  return (
    <Grid container alignContent='space-between'>
      <Grid item xs={12} md={4}>
        <Typography variant='subtitle2' color='textPrimary'>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        {children}
      </Grid>
    </Grid>
  )
}

export default InformationBox