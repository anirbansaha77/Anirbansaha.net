/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { store, persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';

import App from './App/App';
import 'bootstrap-loader';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={<div />}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);
