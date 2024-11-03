import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-md p-4 fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">Todo<sup>'ist</sup></div>
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-500 font-semibold transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-gray-700 hover:text-blue-500 font-semibold transition-colors duration-300"
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              to="/todo"
              className="text-gray-700 hover:text-blue-500 font-semibold transition-colors duration-300"
            >
              Todo
            </Link>
          </li>
        </ul>
        <div className="md:hidden">
          <button className="text-gray-700 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <ul className="md:hidden flex flex-col space-y-4 mt-4">
        <li>
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-500 font-semibold transition-colors duration-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="block text-gray-700 hover:text-blue-500 font-semibold transition-colors duration-300"
          >
            Register
          </Link>
        </li>
        <li>
          <Link
            to="/todo"
            className="block text-gray-700 hover:text-blue-500 font-semibold transition-colors duration-300"
          >
            Todo
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
