import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

const browserHistory = createBrowserHistory();

export const routingStore = new RouterStore();

export const history = syncHistoryWithStore(browserHistory, routingStore);
