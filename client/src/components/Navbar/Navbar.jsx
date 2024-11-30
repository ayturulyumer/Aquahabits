import { Link } from 'react-router-dom'
import habitLogo from '../../assets/habitlogo.png';
import HamburgerIcon from "../../svg/burger-menu.svg"




import styles from "./Navbar.module.scss"
export default function Navbar() {
    return (
        <header className={styles.topNav}>
            <nav>
                <Link className={styles.logo}>
                    <img src={habitLogo} alt="Habitect Logo" />
                    <span>Habitect</span>
                </Link>
                <ul className={styles.navList}>
                    <li>
                        <a><Link to="/">Home</Link> </a>
                    </li>
                    <li>
                        <a><Link to="/">FAQ</Link> </a>
                    </li>
                    <li>
                        <a><Link to="/">Pricing</Link> </a>
                    </li>
                </ul>
            <div className={styles.hamburgerMenu}>
                <img src={HamburgerIcon} alt="" />
            </div>
            </nav>
        </header>
    )
}
