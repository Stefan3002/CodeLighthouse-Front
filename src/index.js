import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Router} from "react-router-dom";
import {persistor, store} from "./utils/store/store";
import {PersistGate} from "redux-persist/integration/react";
import Blur from "./components/Blur/blur";
import Spinner from "./components/Spinner/spinner";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <PersistGate loading={<><Blur /><Spinner /></>} persistor={persistor}>
                  <App />
              </PersistGate>
          </Provider>
      </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
