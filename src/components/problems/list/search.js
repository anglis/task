import React from 'react';
import { Input, IconButton, Grid } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const SearchContainer = () => {
  return (
    <Grid container wrap='nowrap' justify='space-between'>
      <Grid item>
        <Input fullWidth placeholder='Paieska...' />
      </Grid>
      <Grid item>
        <IconButton size='small' color='secondary' >
          <Search />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default SearchContainer;