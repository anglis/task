import { selectors as fetchSelectors } from 'reducers/ducks/common/fetch';

const emptyArray = [];

export const listSelectors = fetchSelectors(['problem', 'list'], emptyArray)