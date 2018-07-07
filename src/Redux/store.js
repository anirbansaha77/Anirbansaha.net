import { createLogger } from 'redux-logger';
import { persistCombineReducers, persistStore } from 'redux-persist';

import { createStore, compose, applyMiddleware } from 'redux';
import session from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import reducers from './Reducers';

const middleware = [];
const persistConfig = {
    storage: session,
    key: 'root',
};
// const reducers2 = persistCombineReducers(reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
        collapsed: true,
    });
    middleware.push(logger);
}
console.log(reducers);
export const store = createStore(persistCombineReducers(persistConfig, reducers), composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);
window.__store = store;
