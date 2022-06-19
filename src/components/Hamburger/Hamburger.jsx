import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Hamburger.css'

const Hamburger = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='hamburger'>
      {isOpen ?
        <div className='open'>
          <svg
            fill='#fff'
            height="30px"
            width="30px"
            viewBox="0 0 512 512 "
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setIsOpen(false)}
            className='close-svg'
          >
            <path
              d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"
            />
          </svg>
          <ul className="ham-links">
            <li className="ham-link">
              <Link to="/home">Home</Link>
            </li>
            <li className="ham-link">
              <Link to="/about">About</Link>
            </li>
            <li className="ham-link">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="ham-link">
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
        :
        <div className='closed'>
          <svg
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 22"
            width="30px"
            height="30px"
            onClick={() => setIsOpen(true)}
          >
            <path
              d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"
            />
          </svg>
        </div>
      }

    </div>
  )
}

export default Hamburger