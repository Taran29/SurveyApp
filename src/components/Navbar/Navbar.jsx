import { Link, useNavigate } from 'react-router-dom'
import Hamburger from '../Hamburger/Hamburger'
import './Navbar.css'

const Navbar = ({ existingUser, setExistingUser }) => {
  const navigate = useNavigate()
  const logoutFunction = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user')
    setExistingUser(false)
    navigate('/login')
  }

  return (
    <div className="nav-parent">
      <div className="nav-container">
        <Link to="/home" className="nav-logo">Home</Link>
        <ul className="nav-links">
          {existingUser ?
            <>
              <li className="nav-link">
                <Link to="/about">About</Link>
              </li>
              <li className="nav-link">
                <Link to="/profile">Profile</Link>
              </li>
              <li className='nav-link' onClick={logoutFunction}>
                <span>Logout</span>
              </li>
            </>
            :
            <>
              <li className="nav-link">
                <Link to="/register">Register</Link>
              </li>
              <li className="nav-link">
                <Link to="/login">Login</Link>
              </li>
            </>
          }
        </ul>
        <Hamburger existingUser={existingUser} setExistingUser={setExistingUser} logoutFunction={logoutFunction} />
      </div>
    </div>
  )
}

export default Navbar