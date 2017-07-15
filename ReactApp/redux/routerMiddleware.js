import { PUSH, RESET, REPLACE, POP } from './router';

const routerMiddleware = store => next => action => {
    if (!action || !action.route) {
        return next(action)
    }

    const state = store.getState();
    if (!state.router.router || action.route.title === state.router.currentRoute.title) {
        return next(action)
    }

    switch (action.type) {
    case PUSH:
        state.router.router.push(action.route);
    case RESET:
        state.router.router.resetTo(action.route);
    case REPLACE:
        state.router.router.replace(action.route);
    case POP:
        state.router.router.pop();
    default:
      return next(action)
  }
}

export default routerMiddleware
