import ListStore from 'stores/ListStore/ListStore';
import { routingStore } from 'historyConfig';

export default {
    routing: routingStore,
    listStore: new ListStore()
}
