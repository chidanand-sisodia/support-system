// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="  bg-gray-800 text-white p-4  ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">
          <Link to="/">Support System</Link>
        </div>
        <div>
          <Link to="/" className="px-4 py-2 hover:bg-gray-700 rounded">Home</Link>
          <Link to="/about" className="px-4 py-2 hover:bg-gray-700 rounded">About</Link>
          <Link to="/login" className="px-4 py-2 hover:bg-gray-700 rounded">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
