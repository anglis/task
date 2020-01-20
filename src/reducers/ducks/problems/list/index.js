import { createSetData, createSetFetching } from 'reducers/ducks/common/fetch';
import { createRequestMessageHandler } from 'shared/utils/httpRequestMessageHandler';

export const NAME = 'FETCH_PROBLEMS_LIST';

export const setData = createSetData(NAME);
export const setFetching = createSetFetching(NAME);
export const startFetching = setFetching(true);
export const stopFetching = setFetching(false);

// Operators

const messageHandler = createRequestMessageHandler();

export const fetchProblems = query => (dispatch, _, { api }) => {
  return api
    .get(`/private/problems/list?${query}`)
    .catch(error => {
      dispatch(messageHandler(error));

      throw error;
    })
}

export const fetchProblemsToStore = filterParams => dispatch => {
  dispatch(startFetching);

  return dispatch(fetchProblems(filterParams))
    .then(response => {
      dispatch(setData(response.data))
    })
    .finally(() => {
      dispatch(stopFetching);
    })
}
