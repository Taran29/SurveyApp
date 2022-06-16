import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="nav-parent">
      <div className="nav-container">
        <a href="/" className="nav-logo">Survey</a>
        <ul className="nav-links">
          <li className="nav-link">
            <a href="/">Home</a>
          </li>
          <li className="nav-link">
            <a href="/">About</a>
          </li>
          <li className="nav-link">
            <a href="/">Contact</a>
          </li>
          <li className="nav-link">
            <a href="/">Profile</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar