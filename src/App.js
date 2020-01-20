import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { MuiThemeProvider } from '@material-ui/core'
import { LocalizeProvider } from "react-localize-redux";
import './App.css';
import InitTranslate from './shared/components/translate';
import { NotificationList } from './shared/components/notifications';
import { composeWithDevTools } from 'redux-devtools-extension';

import { AppRouter } from './routes';
import rootReducer from './reducers';
import api from './shared/api';
import { theme } from './theme';

const preloadedState = {
  user: {
    token: localStorage.getItem('token'),
  },
}

const store = createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument({ api: api() })
    ),
  )
);


function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <LocalizeProvider store={store}>
            <InitTranslate />
            <NotificationList />
            <AppRouter />
          </LocalizeProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
