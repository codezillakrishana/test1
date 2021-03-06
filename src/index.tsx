import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// Redux
import reducer from "./store/reducer"
import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const store: Store<ElectionAction, ElectionAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results 
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
