import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from './components/app';
import store, { history } from './stores';
import { ActionCableProvider } from 'react-actioncable-provider'
import Defender from './helpers/defender';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css';

const actionCableUrl = process.env.REACT_APP_CABLE_URL || 'ws://localhost:8080/cable';
const token = "?token="+Defender.token();
render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <ActionCableProvider url={actionCableUrl+token}>
          <App />
          </ActionCableProvider>
        </div>
      </ConnectedRouter>
    </Provider>
  , document.getElementById('root'));
registerServiceWorker();
