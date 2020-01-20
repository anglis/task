import { messageHandlerWithDependencies } from './httpRequestMessageHandler';


describe('Test suite fro handling request messages', () => {
  let mockTranslate;
  let mockGetTranslate;
  let mockNotificationActions;
  let mockDispatch;
  let messageHandler;

  beforeEach(() => {
    mockTranslate = jest.fn(() => '');
    mockGetTranslate = jest.fn(() => mockTranslate);
    mockNotificationActions = { displayMessage: jest.fn() };
    mockDispatch = jest.fn(func => {
      if (typeof func === 'function') {
        return func(jest.fn(), jest.fn())
      }

      return () => { }
    });

    messageHandler = messageHandlerWithDependencies({
      getTranslate: mockGetTranslate,
      notificationActions: mockNotificationActions
    });
  });

  it('should throw error if translate function was not passed', () => {
    expect(() => messageHandlerWithDependencies()()()()).toThrow('Missing getTranslate dependency');
  });

  it('should display notification if http response is empty', () => {
    messageHandler()()(jest.fn(), jest.fn());

    expect(mockTranslate).toBeCalledWith('notifications.errors.defaultMessage');
  });

  it('should loop throw passed messages and if predicate returns true display message', () => {
    const messages = [
      {
        title: 'errorMessage',
        type: 'error',
        predicate: () => true
      }
    ]

    messageHandler(messages)({ a: 'a' })(mockDispatch, jest.fn());

    expect(mockNotificationActions.displayMessage)
      .toBeCalledWith('error', 'errorMessage');
  });

  it('should translate messages title if passed obj', () => {
    const messages = [
      {
        title: { key: 'translate.key' },
        type: 'error',
        predicate: () => true
      }
    ]

    messageHandler(messages)({ a: 'a' })(mockDispatch, jest.fn());

    expect(mockTranslate).toBeCalledWith('translate.key', undefined);
  });

  it('should return empty string if title is undefined', () => {
    const messages = [
      {
        title: undefined,
        type: 'error',
        predicate: () => true
      }
    ]

    messageHandler(messages)({ a: 'a' })(mockDispatch, jest.fn());

    expect(mockNotificationActions.displayMessage).toBeCalledWith('error', '');
  });

  it('should return default error if status is not implemented', () => {
    messageHandler()({ a: 'a' })(mockDispatch, jest.fn());

    expect(mockTranslate).toBeCalledWith('notifications.errors.defaultMessage');
  });

  it('should return implemented notification', () => {
    messageHandler()({ response: { status: 404 } })(mockDispatch, jest.fn());

    expect(mockTranslate).toBeCalledWith('notifications.errors.notFound');
  });
});