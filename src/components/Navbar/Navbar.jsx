import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="nav-parent">
      <div className="nav-container">
        <Link to="/" className="nav-logo">Survey</Link>
        <ul className="nav-links">
          <li className="nav-link">
            <Link to="/home">Home</Link>
          </li>
          <li className="nav-link">
            <Link to="/">About</Link>
          </li>
          <li className="nav-link">
            <Link to="/">Contact</Link>
          </li>
          <li className="nav-link">
            <Link to="/">Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar