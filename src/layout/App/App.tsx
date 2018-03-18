import * as React from 'react';

import Counter from 'components/Counter/Counter';
import List from 'components/List/List';
import LazyList from 'components/LazyList/LazyList';
import HierarchyList from 'components/HierarchyList/HierarchyList';

import * as styles from './App.sss';

const App: React.SFC = () => (
    <div
        className={styles.base}
    >
        <HierarchyList />
        <a href="#">App</a>
        <Counter />
        <h3>Simple list:</h3>
        <List />
        <h3>Lazy list:</h3>
        <LazyList />
    </div>
);

export default App;
