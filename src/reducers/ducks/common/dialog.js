import { path } from 'ramda';

const SET_OPEN = 'MYKPI/DIALOG/SET_OPEN';
const SET_DATA = 'MYKPI/DIALOG/SET_DATA';

const defaultSate = {
  open: false,
  data: null
}

export const selectors = pt => {
  return {
    isOpen: path([...pt, 'open']),
    getData: path([...pt, 'data']),
  }
}

export default function dialogReducer(state = defaultSate, { type, payload } = {}) {
  switch (type) {
    case SET_OPEN:
      return { ...state, open: payload }
    case SET_DATA:
      return { ...state, data: payload }
    default:
      return state
  }
}

export const createSetOpenDialog = name => open => ({
  name,
  type: SET_OPEN,
  payload: open
});

export const createSetDialogData = name => data => ({
  name,
  type: SET_DATA,
  payload: data
});
