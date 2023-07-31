import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 py-6 mt-5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <Link to='/'><h3 className="text-white text-2xl font-semibold mb-4 hover:text-green-300">Grow Green</h3></Link>
                        <p className="text-white text-sm mb-2">123 Green Street, City</p>
                        <p className="text-white text-sm mb-2">info@growgreen.com</p>
                        <p className="text-white text-sm mb-2">+1 (123) 456-7890</p>
                    </div>
                    <div className="text-center md:text-left">
                        <Link to='/services'><h3 className="text-white text-2xl font-semibold mb-4 hover:text-green-300">Services</h3></Link>
                        <ul className="text-white">
                            <li className="mb-2">
                                <Link to="#" className="hover:text-green-300">Garden Design</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="#" className="hover:text-green-300">Plant Installation</Link>
                            </li>
                            {/* Add more services here */}
                        </ul>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-white text-2xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex justify-center md:justify-start">
                            <Link to="#" className="text-white hover:text-green-300 mr-4">
                                <FaFacebookF size={24} />
                            </Link>
                            <Link to="#" className="text-white hover:text-green-300 mr-4">
                                <FaTwitter size={24} />
                            </Link>
                            <Link to="#" className="text-white hover:text-green-300">
                                <FaLinkedin size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-6 text-center md:text-left">
                    <p className="text-white text-sm">&copy; 2023 Grow Green. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
