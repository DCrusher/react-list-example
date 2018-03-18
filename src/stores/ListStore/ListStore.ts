import { observable, action } from 'mobx';
import ListItem from 'models/ListItem';

import ListMock from './ListMock';

const listMockGenerated: ListItem[] = [];
const nestedListMockGenerated: any[] = [];

let i: number = 0;
while (i < 1000) {
    listMockGenerated.push({
        id: i,
        name: `item${i}`,
        caption: `Item ${i}`,
    });
    i++;
}
let j: number = 0;
while (j < 100) {
    nestedListMockGenerated.push({
        name: `item${j}`,
        children: [
            {
                name: `item${j}.1`,
                children: [
                    {
                        name: `item${j}.1.1`,
                    }, {
                        name: `item${j}.1.2`,
                    },
                ],
            },
            {
                name: `item${j}.2`,
            },
        ],
    });

    j++;
}

export default class ListStore {
    @observable list: ListItem[];
    @observable listLazy: ListItem[] = [];
    @observable nestedList: any[] = [];

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

    @action
    fetchNestedList(): void {
        this.nestedList = nestedListMockGenerated;
    }
}
