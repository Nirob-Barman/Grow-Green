import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const NavBar = () => {

    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = (
        <ul className="flex items-center">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/allProducts">Products</Link></li>

            {
                user ? <div className='flex items-center'>
                    <li>
                        <span>{user.displayName}</span>
                    </li>
                    <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>

                </div> : <div><Link to="/login">Login</Link></div>
            }

        </ul>
    );


    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <Link to="/" className="btn btn-ghost normal-case text-xl">Grow Green</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {/* Navigation options */}
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user && <Link to='dashboard'>DashBoard</Link>}
                </div>
            </div>
        </div>
    );
};

export default NavBar;


