import { useEffect } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

const Home = ({ setExistingUser }) => {

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      navigate('/login')
    } else {
      setExistingUser(true)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="home-container">
      <h1>Home</h1>
    </div>
  )
}

export default Home