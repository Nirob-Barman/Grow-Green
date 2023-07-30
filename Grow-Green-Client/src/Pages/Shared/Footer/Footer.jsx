import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 py-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-white text-2xl font-semibold mb-4">Grow Green</h3>
                        <p className="text-white text-sm mb-2">123 Green Street, City</p>
                        <p className="text-white text-sm mb-2">info@growgreen.com</p>
                        <p className="text-white text-sm mb-2">+1 (123) 456-7890</p>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-white text-2xl font-semibold mb-4">Services</h3>
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
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                            <Link to="#" className="text-white hover:text-green-300 mr-4">
                                <i className="fab fa-twitter"></i>
                            </Link>
                            <Link to="#" className="text-white hover:text-green-300">
                                <i className="fab fa-instagram"></i>
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
