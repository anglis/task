import { combineReducers } from "redux";

import createNamedWrapperReducer from 'reducers/ducks/common/utils';
import fetchReducer from 'reducers/ducks/common/fetch';
import { NAME as listName } from './list';

export * from './operators';

export default combineReducers({
  list: createNamedWrapperReducer(fetchReducer, listName),
})

