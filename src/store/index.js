import { createStore, combineReducers, applyMiddleware } from 'redux';

import reporter from './middleware/reporter.js';
import thunk from './middleware/thunk.js';
import codeReducer from './reducers/code.js';

let reducers = combineReducers({
  challenges: codeReducer,
});

export default () => createStore(reducers, applyMiddleware(thunk, reporter));

// , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
