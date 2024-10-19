import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <>
        {/* <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/todo">Todo</Link></li>
            </ul>
        </nav> */}
        <nav className="bg-white shadow-md p-4">
        <ul className="flex justify-center space-x-6">
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
      </nav>
    </>
  )
}

export default Navigation