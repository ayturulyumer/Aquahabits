import { useState } from 'react';
import { Link } from 'react-router-dom';
import habitLogo from '../../assets/habitlogo.png';
import BurgerIcon from '../../svg/burger-menu.svg';
import CloseIcon from '../../svg/close-icon.svg';


export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);

    const handleToggleMenu = () => {
        setShowMenu((prevState) => !prevState);
    };

    return (
        <nav className="navbar w-screen">
            <div className="navbar-start mx-8">
                <Link to="/" className="text-3xl font-light tracking-normal ">Habitect</Link>
            </div>
            <div className="navbar-center">
                <ul className="flex gap-20 mr-4">
                    <li className="hover-red-underline cursor-pointer">Pricing</li>
                    <li className="hover-red-underline cursor-pointer">FAQ</li>
                    <li className="hover-red-underline cursor-pointer">About</li>
                </ul>
            </div>
            <div className="navbar-end">
                <ul className="flex mx-8">
                    <li className="btn btn-md btn-outline  text-white">Login</li>
                </ul>
            </div>
        </nav>




    );
}
