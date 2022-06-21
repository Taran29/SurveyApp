import React, { useState, useEffect } from 'react'
import TextField from '../../utils/TextField/TextField'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Login.css'

const Login = ({ setExistingUser }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      navigate('/home')
    }
    try {
      if (location.state.email) {
        setEmail(location.state.email)
      }
    } catch (error) { }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const btnSubmitFunction = async (event) => {
    event.preventDefault()
    const user = {
      email: email,
      password: password
    }
    let result = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(user),
    })

    if (result.status === 400) {
      alert('Either email or password is incorrect')
      return
    }

    if (result.status === 200) {
      localStorage.setItem('auth-token', result.headers.get('x-auth-token'))
      setExistingUser(true)
      navigate('/home')
    }
  }

  return (
    <form className="login-container" onSubmit={e => btnSubmitFunction(e)}>
      <span className="login-title">Login</span>
      <TextField
        type="email"
        placeholder="Enter your email..."
        value={email || ''}
        setValue={email => setEmail(email)}
      />
      <TextField
        type="password"
        placeholder="Enter your password..."
        value={password || ''}
        setValue={password => setPassword(password)}
      />

      <span className='forgot-pw-text'>
        <Link to="/forgotPassword" className='registerRoute'>Forgot Password?</Link>
      </span>

      <button
        type="submit"
        className="submitBtn"
      >Login</button>

      <span className='registerText'>
        Not a user? Sign in <Link to="/register" className="registerRoute">here!</Link>
      </span>
    </form>
  )
}

export default Login
