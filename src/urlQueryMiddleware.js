import urlQueryReducer from './urlQueryReducer';
import urlQueryOptions from './urlQueryOptions';

/**
 * Middleware to handle updating the URL query params
 */
const urlQueryMiddleware = (options = {}) => ({ getState }) => next => (action) => {
  // if not a URL action, do nothing.
  if (!action.meta || !action.meta.urlQuery) {
    return next(action);
  }

  // otherwise, handle with URL handler -- doesn't go to Redux dispatcher
  // update the URL

  // use the default reducer if none provided
  const reducer = options.reducer || urlQueryOptions.reducer || urlQueryReducer;

  // if configured to read from the redux store (react-router-redux), do so and pass it to
  // the reducer
  const readRoutingFromStore = options.readRoutingFromStore == null ?
    urlQueryOptions.readRoutingFromStore : options.readRoutingFromStore;

  if (readRoutingFromStore) {
    const { routing = {} } = getState();
    return reducer(action, routing.locationBeforeTransitions);
  }

  return reducer(action);
};

export default urlQueryMiddleware;