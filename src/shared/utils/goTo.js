import { history } from 'routes';

export const goTo = url => {
  if (history.location !== url) {
    history.push(url)
  }
}

export const replacePage = url => {
  history.replace(url)
}