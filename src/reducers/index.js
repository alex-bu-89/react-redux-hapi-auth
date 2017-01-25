import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import authenticationReducer from './authentication-reducer';

const rootReducer = combineReducers({
  authenticationReducer,
  routing: routerReducer
});

export default rootReducer;
