import { Link, useLocation } from "react-router-dom";
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
// import { useState } from "react";

const cx = classNames.bind(styles);

function Navbar({ isBar, setIsBar }) {
    // const [isBar, setIsBar] = useState(true)
    const location = useLocation();

    const navbar = [
        {
            id: 1,
            content: 'home',
            link: '',
        },
        {
            id: 2,
            content: 'status',
            link: 'players',
        },
        {
            id: 3,
            content: 'missions',
            link: 'tasks',
        },
        {
            id: 4,
            content: 'items',
            link: 'items',
        },
        {
            id: 5,
            content: 'etc',
            link: '#',
        },
    ];

    return (
        <div className={cx('navbar-wrapper')}>
            {/* <div className={cx('navbar')}> */}
                <ul className={cx('navbar-list')}>
                    {isBar === true ? navbar.map((item, idx) => (
                        <li key={idx} className={cx('navbar-list__item', {active: location.pathname === `/${item.link}`})}>
                            <Link to={item.link}>{item.content}</Link>
                        </li>
                    )) : <li className={cx('navbar-list__item')} onClick={() => setIsBar(true)}><Link>...</Link></li>}
                </ul>
            {/* </div> */}
            {isBar && <div className={cx('overlay')} onClick={() => setIsBar(false)}></div>}
        </div>
    );
}

export default Navbar;
