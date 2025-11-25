import { Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Navbar from '../../components/Navbar';
import { useState } from 'react';

const cx = classNames.bind(styles);

export default function Layout() {
    const [isBar, setIsBar] = useState(true)
    
    return (
        <>
            <Navbar isBar={isBar} setIsBar={setIsBar} />

            <div style={{zIndex: `${isBar === true ? 0 : 2}`}} className={cx('page-container')}>
                <Outlet />
            </div>
        </>
    );
}
