import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext.jsx';



export default function NavbarTop() {
    const { user } = useAuth()


    return (
        <header>
            <nav className="navbar bg-custom-gradient ">
                <div className="navbar-start mx-8">
                    <img className='h-12 w-12' src="/logo.png" alt="Logo" />
                    <Link to="/" className="text-3xl font-light  text-primary tracking-normal ">AquaHabits</Link>
                </div>
                <div className="navbar-center">
                </div>
                <div className="navbar-end">
                    {user ?  <Link to="/dashboard">
                                <button type='button' className="btn btn-md btn-outline text-neutral">Dashboard</button>
                            </Link>
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
