import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hamburger from '../Hamburger/Hamburger'
import './Navbar.css'

const Navbar = () => {

  const [width, setWidth] = useState(window.innerWidth);

  const updateHeight = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="nav-parent">
      <div className="nav-container">
        <Link to="/" className="nav-logo">Survey</Link>
        {width > 650 ?
          <ul className="nav-links">
            <li className="nav-link">
              <Link to="/home">Home</Link>
            </li>
            <li className="nav-link">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-link">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="nav-link">
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
          :
          <>
            <Hamburger />
          </>
        }
      </div>
    </div>
  )
}

export default Navbar