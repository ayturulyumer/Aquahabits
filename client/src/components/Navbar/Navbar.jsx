import { useState } from 'react';
import { Link } from 'react-router-dom';
import habitLogo from '../../assets/habitlogo.png';
import BurgerIcon from '../../svg/burger-menu.svg';
import CloseIcon from '../../svg/close-icon.svg';

import styles from './Navbar.module.scss';

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);

    const handleToggleMenu = () => {
        setShowMenu((prevState) => !prevState);
    };

    return (
        <header className={styles['navbar']}>
            <nav className={styles['navbar__container']}>
                <Link to="/" className={styles['navbar__logo']}>
                    <img src={habitLogo} alt="Habitect Logo" className={styles['navbar__logo-img']} />
                    <span className={styles['navbar__logo-text']}>Habitect</span>
                </Link>
                <ul className={`${styles['navbar__menu']} ${showMenu ? styles['navbar__menu--visible'] : ''}`}>
                    <li className={styles['navbar__menu-item']}>
                        <Link to="/" className={styles['navbar__menu-link']}>Home</Link>
                    </li>
                    <li className={styles['navbar__menu-item']}>
                        <Link to="/faq" className={styles['navbar__menu-link']}>FAQ</Link>
                    </li>
                    <li className={styles['navbar__menu-item']}>
                        <Link to="/pricing" className={styles['navbar__menu-link']}>Pricing</Link>
                    </li>
                </ul>
                <div onClick={handleToggleMenu} className={styles['navbar__toggle']}>
                    <img src={showMenu ? CloseIcon : BurgerIcon} alt="Menu Icon" />
                </div>
            </nav>
        </header>
    );
}
