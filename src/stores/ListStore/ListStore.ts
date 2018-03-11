import { observable, action } from 'mobx';
import ListItem from 'models/ListItem';

import ListMock from './ListMock';

const listMockGenerated: ListItem[] = [];

let i: number = 0;
while (i < 1000) {
    listMockGenerated.push({
        id: i,
        name: `item${i}`,
        caption: `Item ${i}`,
    });
    i++;
}

export default class ListStore {
    @observable list: ListItem[];
    @observable listLazy: ListItem[] = [];

    @action
    fetchListItems(): void {
        this.list = ListMock.items;
    }

    getTotalCountLazyItems(): number {
        return listMockGenerated.length;
    }

    @action
    fetchListLazyItems(offset: number, perPage: number): void {
        const newPortion = listMockGenerated.slice(offset, offset + perPage);
        const listLazy = this.listLazy;

        listLazy.push(...newPortion);
    }
}
