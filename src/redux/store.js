import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './rootReducer';


const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;