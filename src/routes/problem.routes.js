import React from "react";
import { Route, Switch } from "react-router-dom";
import { Grid } from '@material-ui/core';

import Problem from 'components/problems';
import DetailView from 'components/problems/detailView';

export default (props) => {
  return (
    <Switch>
      <Route
        path={`${props.match.url}/problem/:id`}
      >
        {
          ({ match }) => {
            return (
              <React.Fragment>
                <Grid container>
                  <Grid item md={4}>
                    <Problem />
                  </Grid>
                  <Grid item md={8}>
                    <DetailView id={match.params.id} />
                  </Grid>
                </Grid>
              </React.Fragment>
            )
          }
        }
      </Route>
      <Route
        path={props.match.url}
        component={Problem} />
    </Switch>
  )
}


