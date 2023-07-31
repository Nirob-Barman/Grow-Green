import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import { FaShoppingCart } from 'react-icons/fa';
import useWishedProducts from '../../../Hooks/useWishedProducts';

const NavBar = () => {

    const { user, logOut, userRole } = useAuth();
    const [wishListedProducts] = useWishedProducts();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = (
        <ul className="flex items-center">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Order</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/allProducts">All Products</Link></li>


            {
                user ? <div className='flex items-center'>
                    {/* <li><Link to="/order/seeds">Order Product</Link></li> */}
                    {
                        userRole === 'user' && <li>
                            <FaShoppingCart></FaShoppingCart>
                            <Link to="/dashboard/selectedProducts">

                                <button className="btn gap-2">
                                    <FaShoppingCart></FaShoppingCart>
                                    <div className="badge badge-secondary">+
                                        {

                                            wishListedProducts?.length || 0
                                        }</div>
                                </button>
                            </Link></li>
                    }
                    {/* <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button> */}
                </div> : <li><Link to="/login">Login</Link></li>
            }
            <li onClick={handleLogOut}><Link>LogOut</Link></li>
        </ul>
    );

    return (
        <div>
            {/* <div className="navbar fixed z-10 bg-base-100">
                <div className="navbar-start">
                    <Link to="/" className="btn btn-ghost normal-case text-xl">Grow Green</Link>
                </div>
                <div className="navbar-center lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user && <Link to='dashboard'>DashBoard</Link>}
                </div>
            </div> */}

            <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>

                        <ul tabIndex={0} className="text-black menu menu-compact dropdown-content mt-3 p-2  bg-base-100 rounded-box ">
                            {navOptions}
                        </ul>
                    </div>

                    <Link to='/' className="btn btn-ghost normal-case text-xl">Grow Green</Link>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user && <Link to='dashboard/information'>DashBoard</Link>}
                </div>
            </div>
        </div>
    );
};

export default NavBar;


