import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import promise from 'redux-promise-middleware';
import searchReducer from './containers/MovieSearchContainer/searchReducer';
import App from './app';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* eslint-disable no-underscore-dangle */

const rootReducer = combineReducers({
  movieData: searchReducer
});

const store = createStore(
  rootReducer, 
  composeEnhancers(
    applyMiddleware(promise)
  )
);

/* eslint-enable */

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
