import { createStore, compose, applyMiddleware } from 'redux';
// import { responsiveStoreEnhancer } from 'redux-responsive';
import thunk from 'redux-thunk';

import rootReducer from '../redux/reducers';

const configureStore = (initialState = {}) => {
	const middleware = [thunk];
	const enhancers = [];
	const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));
	return store;
};

export default configureStore;

// compose(responsiveStoreEnhancer, applyMiddleware(...middleware), ...enhancers),
