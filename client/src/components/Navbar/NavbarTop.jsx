import { Link } from 'react-router-dom';
import habitLogo from '../../assets/habitlogo.png';
import { useAuth } from '../../context/authContext.jsx';



export default function NavbarTop() {
    const { user } = useAuth()


    return (
        <header>
            <nav className="navbar bg-custom-gradient ">
                <div className="navbar-start mx-8">
                    <Link to="/" className="text-3xl font-light text-primary tracking-normal ">Habitect</Link>
                </div>
                <div className="navbar-center">
                    <ul className="flex gap-20 mr-4">
                        <li className="hover-red-underline cursor-pointer">Pricing</li>
                        <li className="hover-red-underline cursor-pointer">FAQ</li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? <p>Hello {user.name}</p>
                        :
                        <ul className="flex mx-20">
                            <Link to="/login">
                                <button type='button' className="btn btn-md btn-outline text-neutral">Login</button>
                            </Link>
                        </ul>}

                </div>
            </nav>
        </header>




    );
}
