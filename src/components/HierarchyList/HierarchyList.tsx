import * as React from 'react';
import { isEmpty, includes, clone } from 'lodash';
import { inject, observer } from 'mobx-react';
import * as classNames from 'classnames';

import ListStore from 'stores/ListStore/ListStore';

import styles from './HierarchyList.sss';

interface ListItem {
    name: string;
    children: ListItem[];
}

interface ListProps {
    items: ListItem[];
    itemRenderer(item: ListItem): JSX.Element;
    onItemClick?(item: ListItem, index: number): void;
}

interface HierarchyListProps {
    listStore?: ListStore;
}

interface ListItemProps {
    item: ListItem;
    isUnfolded?: boolean;
    onClick?(): void;
    itemRenderer(item: ListItem): JSX.Element;
    onItemClick?(item: ListItem, index: number): void;
}

const ListItem: React.SFC<ListItemProps> = (props) => {
    function getFoldingSign(
        isNode: boolean,
        isCollapsed: boolean,
    ): JSX.Element | undefined {
        if (isNode) {
            const nodeFoldingSign = isCollapsed ? '-' : '+';

            return (
                <span className={styles.foldingSign}>
                    {nodeFoldingSign}
                </span>
            );
        }

        return;
    }

    const {
        item,
        isUnfolded,
        onClick: onClickHanlder,
        onItemClick,
        itemRenderer,
    } = props;
    const { children } = item;
    const isHasChildren = children && !isEmpty(children);

    const childrenList =
        (isHasChildren && isUnfolded) ?
        (
            <List
                items={children}
                itemRenderer={itemRenderer}
                onItemClick={onItemClick}
            />
        ) :
        null;

    const itemCaptionClasses = classNames({
        [styles.itemNode]: isHasChildren,
        [styles.itemLeaf]: !isHasChildren,
    });

    return (
        <li>
            <div
                className={itemCaptionClasses}
                onClick={onClickHanlder}
            >
                {getFoldingSign(isHasChildren, !!isUnfolded)}
                {itemRenderer(item)}
            </div>
            {childrenList}
        </li>
    );
};

class List extends React.Component<ListProps> {
    state = {
        unfolded: [],
    };

    isItemFolded(index: number): boolean {
        return !includes(this.state.unfolded, index);
    }

    handleClickItem(index: number): void {
        const unfoldedCloned = clone(this.state.unfolded);
        const {
            onItemClick: onItemClickHandler,
            items,
        } = this.props;

        if (this.isItemFolded(index)) {
            unfoldedCloned.push(index);
        } else {
            unfoldedCloned.splice(unfoldedCloned.indexOf(index), 1);
        }

        if (onItemClickHandler) {
            onItemClickHandler(items[index], index);
        }

        this.setState({ unfolded: unfoldedCloned });
    }

    renderItems = (itemParams: ListItem, index: number): JSX.Element => {
        const isFolded = this.isItemFolded(index);

        return (
            <ListItem
                key={index}
                item={itemParams}
                isUnfolded={!isFolded}
                onClick={this.handleClickItem.bind(this, index)}
                itemRenderer={this.props.itemRenderer}
                onItemClick={this.props.onItemClick}
            />
        );
    }

    render(): JSX.Element {
        const { items } = this.props;

        const listItems = items.map(this.renderItems);

        return (
            <ul className={styles.list}>
                {listItems}
            </ul>
        );
    }

}

@inject('listStore')
@observer
export default class HierarchyList extends React.Component<HierarchyListProps> {

    componentDidMount() {
        this.props.listStore!.fetchNestedList();
    }

    onItemClick(item: ListItem, index: number): void {
        console.log(item);
    }

    renderItem(item: ListItem): JSX.Element {
        return (
            <span>{item.name}</span>
        );
    }

    render(): JSX.Element {
        const { nestedList } = this.props.listStore!;

        if (nestedList && !isEmpty(nestedList)) {
            return (
                <List
                    items={nestedList}
                    itemRenderer={this.renderItem}
                    onItemClick={this.onItemClick}
                />
            );
        } else {
            return (
                <div>
                    No items
                </div>
            );
        }
    }
}
