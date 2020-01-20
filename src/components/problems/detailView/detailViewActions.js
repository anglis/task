import React from 'react';
import { Grid, Button } from '@material-ui/core';

const DetailViewActions = ({ openEditDialog, openDeleteDialog }) => {
  return (
    <Grid container justify='flex-end' spacing={1}>
      <Grid item>
        <Button variant='contained' color='secondary' onClick={openDeleteDialog}>Panaikinti</Button>
      </Grid>
      <Grid item>
        <Button variant='contained' color='primary' onClick={openEditDialog}>Redaguoti</Button>
      </Grid>
    </Grid>
  )
}

export default DetailViewActions;