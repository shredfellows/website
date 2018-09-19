import { createStore, combineReducers, applyMiddleware } from 'redux';
import reporter from './middleware/reporter.js';
import thunk from './middleware/thunk.js';
import codeReducer from './reducers/code.js';
import userReducer from './reducers/users.js';
import assignmentReducer from './reducers/assignment.js';
import permissionsReducer from './reducers/permissions.js';

let reducers = combineReducers({
  challenges: codeReducer,
  user: userReducer,
  assignment: assignmentReducer, 
  loggedIn: permissionsReducer,
});

export default () => createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk, reporter));