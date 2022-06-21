import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hamburger from '../Hamburger/Hamburger'
import './Navbar.css'

const Navbar = ({ existingUser, setExistingUser }) => {

  const [width, setWidth] = useState(window.innerWidth);
  const hamburgerActiveWidth = 650

  const updateHeight = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const logoutFunction = () => {
    localStorage.removeItem('auth-token')
    setExistingUser(false)
  }

  return (
    <div className="nav-parent">
      <div className="nav-container">
        <Link to="/home" className="nav-logo">Survey</Link>
        {width > hamburgerActiveWidth ?
          <ul className="nav-links">
            <li className="nav-link">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-link">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="nav-link">
              {existingUser ?
                <Link to="/login" onClick={logoutFunction}>Logout</Link>
                :
                <Link to="/profile">Profile</Link>}
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