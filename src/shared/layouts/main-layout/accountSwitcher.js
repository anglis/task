import React from 'react';
import { useSelector } from 'react-redux';
import { path } from 'ramda';
import Typography from '@material-ui/core/Typography';
import { Grid, Avatar } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const getAvatarLetter = (name) => {
  try {
    return name[0].toUpperCase()
  } catch (error) {
    return '';
  }
}

function AccountSwitcher({ history }) {
  const name = useSelector(path(['user', 'current', 'firstName']));

  return (
    <React.Fragment>
      <div style={{ padding: '8px 16px', cursor: 'pointer' }}>
        <Grid
          container
          wrap='nowrap'
          spacing={1}
          alignItems='center'

          onClick={() => history.push('/profile')}
        >
          <Grid item>
            <Avatar>
              {getAvatarLetter(name)}
            </Avatar>
          </Grid>
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant='h6' color='textPrimary'>
                {name}
                {' '}
                {useSelector(path(['user', 'current', 'lastName']))}
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: -8 }}>
              <Typography variant='caption' color='textSecondary'>
                {useSelector(path(['user', 'current', 'company', 'name']))}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  )
}

export default withRouter(AccountSwitcher);