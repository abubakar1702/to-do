import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white">
            <nav className="flex justify-center p-4">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="hover:text-gray-300" aria-current="page">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/task" className="hover:text-gray-300">
                            Add Task
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
