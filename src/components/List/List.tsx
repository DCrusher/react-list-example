import * as React from 'react';
import { observer, inject } from 'mobx-react';
import ReactList from 'react-list';

import ListStore from 'stores/ListStore/ListStore';
import ListItem from 'models/ListItem';

import styles from './List.sss';

interface ListProps {
    listStore?: ListStore;
}

@inject('listStore')
@observer
export default class List extends React.Component<ListProps> {

    componentDidMount() {
        this.props.listStore!.fetchListItems();
    }

    renderItem = (index: number): JSX.Element | void => {
        const { list } = this.props.listStore!;

        if (list && list.length) {
            const item: ListItem = list[index];

            return (
                <div key={item.id}>
                    {item.caption}
                </div>
            );
        }
    }

    render(): JSX.Element {
        const { list } = this.props.listStore!;

        if (list && list.length) {
            return (
                <div className={styles.wrapper}>
                    <ReactList
                        length={list!.length}
                        itemRenderer={this.renderItem}
                        type="uniform"
                    />
                </div>
            );
        } else {
            return (
                <div>No items</div>
            );
        }
    }
}
