import * as React from 'react';
import { observer, inject } from 'mobx-react';
import ReactListLazyLoad from 'react-list-lazy-load';
import ReactList from 'react-list';

import ListStore from 'stores/ListStore/ListStore';
import ListItem from 'models/ListItem';

import styles from './LazyList.sss';

interface LazyListProps {
    listStore?: ListStore;
}

interface LazyListState {
    activatedPage: number;
}

const PER_PAGE: number = 30;

@inject('listStore')
@observer
export default class LazyList extends React.Component<LazyListProps, LazyListState> {
    state = {
        activatedPage: 0,
    };

    componentDidMount() {
        this.fetchLazyListPart();
    }

    componentDidUpdate(prevProps: LazyListProps, prevState: LazyListState): void {
        const { activatedPage: prevActivatedPage } = prevState;
        const { activatedPage: currentActivatedPage } = this.state;

        if (currentActivatedPage > prevActivatedPage) {
            this.fetchLazyListPart();
        }
    }

    fetchLazyListPart(): void {
        this.props.listStore!.fetchListLazyItems(
            this.state.activatedPage * PER_PAGE,
            PER_PAGE,
        );
    }

    renderItem = (index: number): JSX.Element | void => {
        const { listLazy } = this.props.listStore!;

        if (listLazy && listLazy.length) {
            const item: ListItem = listLazy[index];

            return (
                <div key={item.id}>
                    {item.caption}
                </div>
            );
        }
    }

    onRequestPage = (): void => {
        this.setState((currentState: LazyListState) => (
            {
                activatedPage: currentState.activatedPage + 1,
            }
        ));
    }

    render(): JSX.Element {
        const { listStore } = this.props;

        if (listStore) {
            const { listLazy } = listStore;
            const listCount = listStore.getTotalCountLazyItems();

            return (
                <div className={styles.wrapper}>
                    <ReactListLazyLoad
                        length={listCount}
                        items={Array.from(listLazy)}
                        loadMargin={5}
                        onRequestPage={this.onRequestPage}
                    >
                        <ReactList
                            length={listLazy.length}
                            itemRenderer={this.renderItem}
                            type="uniform"
                        />
                    </ReactListLazyLoad>
                </div>
            );
        } else {
            return (
                <div>No items</div>
            );
        }
    }
}
