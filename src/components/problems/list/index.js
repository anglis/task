import React from 'react';
import { Grid, List, ListItem, ListItemText, ListSubheader, ListItemAvatar, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { listSelectors } from 'selectors/problem.selector';
import { fetchProblemsToStore } from 'reducers/ducks/problems/list';
import SearchContainer from './search';
import { withRouter } from 'react-router';

const ProblemListContainer = ({ history, match }) => {
  const dispatch = useDispatch();
  const problems = useSelector(listSelectors.getData)

  React.useEffect(() => {
    dispatch(fetchProblemsToStore(''));
  }, [dispatch])

  return (
    <Grid container>
      <Grid item xs={12}>
        <SearchContainer />
      </Grid>
      <Grid item xs={12}>
        <List>
          <ListSubheader title='Problemos' />
          {
            problems.map(problem => (
              <ListItem
                button
                key={problem._id}
                selected={problem._id === match.params.id}
                onClick={() => {
                  history.push(`/problems/problem/${problem._id}`)
                }}
              >
                <ListItemAvatar>
                  <div style={{
                    height: 16,
                    width: 16,
                    borderRadius: 2,
                    backgroundColor: '#000'
                  }} />
                </ListItemAvatar>
                <ListItemText primary={problem.description} />
              </ListItem>
            ))
          }
        </List>
      </Grid>
    </Grid>
  )
}

export default withRouter(ProblemListContainer);