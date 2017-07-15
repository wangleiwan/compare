const fetchMiddleware = store => next => (action) => {
  if (!action || !action.fetchConfig) {
    return next(action);
  }

  let dispatch = store.dispatch;
  let config = action.fetchConfig;

  const path = config.path || '/';
  const method = config.method || 'GET';
  const headers = config.headers || {};
  const params = config.params;
  const body = config.body;
  const successHandler = config.success;
  const failureHandler = config.failure;

  const state = store.getState();
  if (state.auth && state.auth.data && state.auth.data.accessToken) {
    headers.Authorization = `Bearer ${state.auth.data.accessToken}`;
  }
  headers['Content-Type'] = 'application/json';

  function isBadRequestOrServerError(statusCode) {
    return statusCode >= 400 && statusCode < 600;
  }

  /*
    params currently being used for cases where we want to
    send query parameters rather than a JSON body and have already
    constructed the appropriate string
  */
  fetch(path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : params,
  })
    .then(
      response =>
        new Promise((res, rej) => {
          /*
            !isFromConversations check is temporary until we
            ensure we handle bad requests & server errors in catch blocks
            in conversations as we now do elsewhere.
          */
          if (isBadRequestOrServerError(response.status) && !action.isFromConversations) {
            response.json()
            .then(error => rej(error))
            .catch(e => rej()); // handle null error response scenarios
          } else {
            response.json()
            .then(json => res(json))
            .catch(e => res()); // handle null success response scenarios
          }
        }),
    )
    .then(data => successHandler(data))
    .catch(error => failureHandler(error));

};



export default fetchMiddleware;
