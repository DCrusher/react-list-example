import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'mobx-react';
// import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router, Route } from 'react-router';

import App from './layout/App/App';
import stores from 'stores';
import { history } from 'historyConfig';

ReactDOM.render(
    <Provider {...stores}>
        <Router history={history}>
            <Route
                path="/"
                component={App}
            />
        </Router>
    </Provider>,
    document.getElementById('root'),
);
