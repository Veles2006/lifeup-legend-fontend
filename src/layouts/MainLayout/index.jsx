import { Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Navbar from '../../components/Navbar';

const cx = classNames.bind(styles);

export default function Layout() {
    return (
        <>
            <Navbar />

            <div className={cx('page-container')}>
                <Outlet />
            </div>
        </>
    );
}
