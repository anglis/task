import { path as ramdaPath, pathOr } from 'ramda';

const SET_DATA = 'MYKPI/FETCH/SET_DATA';
const SET_FETCHING = 'MYKPI/FETCH/SET_FETCHING';

const defaultSate = {
  data: null,
  fetching: false,
};

export const selectors = (path, or) => {
  return {
    getData: pathOr(or, [...path, 'data']),
    isFetching: ramdaPath([...path, 'fetching']),
  }
}

export default function fetchReducer(state = defaultSate, { type, payload } = {}) {
  switch (type) {
    case SET_FETCHING:
      return { ...state, fetching: payload }
    case SET_DATA:
      return { ...state, data: payload }
    default:
      return state
  }
}

export const createSetData = name => payload => ({
  name,
  payload,
  type: SET_DATA,
});

export const createSetFetching = name => payload => ({
  name,
  payload,
  type: SET_FETCHING,
});
