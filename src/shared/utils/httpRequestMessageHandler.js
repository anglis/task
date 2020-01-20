import { isEmpty, path } from 'ramda';
import * as HTTP_STATUS_CODES from 'http-status-codes';

import { getTranslate as _getTranslate } from 'shared/components/translate';
import { actions as _notificationActions } from 'shared/components/notifications';

const displayDefaultMessages = ({ getTranslate, notificationActions }) => status => (dispatch, getState) => {
  const translate = getTranslate(getState());

  switch (status) {
    case HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR:
      return dispatch(
        notificationActions.displayMessage(
          'error',
          translate('notifications.errors.internalServerError'),
        ),
      );
    case HTTP_STATUS_CODES.BAD_REQUEST:
      return dispatch(
        notificationActions.displayMessage(
          'error',
          translate('notifications.errors.badRequest'),
        ),
      );
    case HTTP_STATUS_CODES.FORBIDDEN:
      return dispatch(
        notificationActions.displayMessage(
          'error',
          translate('notifications.errors.forbidden'),
        ),
      );
    case HTTP_STATUS_CODES.SERVICE_UNAVAILABLE:
      return dispatch(
        notificationActions.displayMessage(
          'error',
          translate('notifications.errors.serviceUnavailable'),
        ),
      );
    case HTTP_STATUS_CODES.NOT_FOUND:
      return dispatch(
        notificationActions.displayMessage(
          'error',
          translate('notifications.errors.notFound'),
        ),
      );
    case HTTP_STATUS_CODES.UNAUTHORIZED:
      return dispatch(
        notificationActions.displayMessage(
          'error',
          translate('notifications.errors.unauthorized'),
        ),
      );
    default:
      return dispatch(
        notificationActions.displayMessage(
          'error',
          translate('notifications.errors.defaultMessage'),
        ),
      );
  }
};

const getMessage = ({ getTranslate }) => message => (_, getState) => {
  const translate = getTranslate(getState());

  if (message == null) {
    return ''
  };

  if (typeof message === 'object') {
    return translate(message.key, message.params)
  }

  return message;
}

export const messageHandlerWithDependencies = ({
  getTranslate,
  notificationActions
} = {}) => (messages = []) => httpResponse => (dispatch, getState) => {
  if (!getTranslate) {
    throw 'Missing getTranslate dependency';
  }

  if (!notificationActions) {
    throw 'Missing notificationActions dependency';
  }

  const translate = getTranslate(getState());
  const status = path(['response', 'status'], httpResponse);

  if (!httpResponse || isEmpty(httpResponse)) {
    return dispatch(
      notificationActions
        .displayMessage('error', translate('notifications.errors.defaultMessage')),
    );
  }

  for (const message of messages) {
    if (message.predicate(httpResponse)) {
      const title = dispatch(getMessage({ getTranslate })(message.title));
      return dispatch(
        notificationActions
          .displayMessage(message.type, title)
      );
    }
  }

  dispatch(displayDefaultMessages({
    getTranslate,
    notificationActions
  })(status));
};

export const createRequestMessageHandler = messageHandlerWithDependencies({
  getTranslate: _getTranslate,
  notificationActions: _notificationActions,
});