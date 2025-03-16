import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from '../Header/Header';

const Layout = () => {
    return (
        <div className={styles.layout}>
          <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;