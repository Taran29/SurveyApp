import { useState, useEffect } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

const Home = ({ setExistingUser }) => {

  const [user, setUser] = useState({
    name: '',
    email: ''
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      navigate('/login')
    } else {
      setExistingUser(true)
    }

    if (localStorage.getItem('user')) {
      let currentUser = JSON.parse(localStorage.getItem('user'))
      setUser({
        name: currentUser.name,
        email: currentUser.email
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="home-container">
      <h1 className='home-title'>Home</h1>
      <span className='home-text'>Name: {user.name}</span>
      <span className='home-text'>Email: {user.email}</span>
      <button
        type="button"
        className='submitBtn create-btn'
        onClick={() => navigate('/createSurvey')}
      >Create Survey</button>
    </div>
  )
}

export default Home