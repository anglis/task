import { createRequestMessageHandler } from "shared/utils/httpRequestMessageHandler";

const getProblemMessageHandler = createRequestMessageHandler();

export const getProblem = id => (dispatch, _, { api }) => {
  return api
    .get(`/private/problems/problem/${id}`)
    .catch(error => {
      dispatch(getProblemMessageHandler(error));

      throw error;
    })
}

const deleteProblemMessageHandler = createRequestMessageHandler([
  {
    title: { key: 'problems.delete.fail' },
    predicate() {
      return true;
    }
  }
]);

export const deleteProblem = id => (dispatch, _, { api }) => {
  return api
    .delete(`/private/problems/problem/${id}`)
    .catch(error => {
      dispatch(deleteProblemMessageHandler(error));

      throw error;
    });
}