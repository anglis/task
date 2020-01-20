import { path, assoc, compose } from 'ramda';

export const formatNewProblem = problem => compose(
  assoc('status', path(['status', 'value'], problem)),
)(problem);
