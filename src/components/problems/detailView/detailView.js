import React from 'react';
import { Grid } from '@material-ui/core';
import { path } from 'ramda';

import { Date } from 'shared/components/date';
import InformationBox from './informationBox';

const DetailViewContainer = ({ problem }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <InformationBox title='Aprasymas'>
          {problem.description}
        </InformationBox>
      </Grid>
      <Grid item xs={12}>
        <InformationBox title='Sprendimo budas'>
          {problem.actionDescription}
        </InformationBox>
      </Grid>
      <Grid item xs={12}>
        <InformationBox title='Busena'>
          {problem.status}
        </InformationBox>
      </Grid>
      <Grid item xs={12}>
        <InformationBox title='Terminas 1'>
          <Date
            format='YYYY-MM-DD HH:mm:ss'
            date={path(['endAt', 0, 'time'], problem)} />
        </InformationBox>
      </Grid>
      <Grid item xs={12}>
        <InformationBox title='Terminas 2'>
          <Date
            format='YYYY-MM-DD HH:mm:ss'
            date={path(['endAt', 1, 'time'], problem)} />
        </InformationBox>
      </Grid>
      <Grid item xs={12}>
        <InformationBox title='Terminas 3'>
          <Date
            format='YYYY-MM-DD HH:mm:ss'
            date={path(['endAt', 2, 'time'], problem)} />
        </InformationBox>
      </Grid>
      <Grid item xs={12}>
        <InformationBox title='Vykdytojas'>
          {path(['assignTo', 'firstName'], problem)}
        </InformationBox>
      </Grid>
      <Grid item xs={12}>
        <InformationBox title='Priskyres darbuotojas'>
          {path(['createdBy', 'firstName'], problem)}
        </InformationBox>
      </Grid>
      <Grid item xs={12}>
        <InformationBox title='Susietas rodiklis'>
          {path(['indicator', 'name'], problem)}
        </InformationBox>
      </Grid>
    </Grid>
  )
}

export default DetailViewContainer