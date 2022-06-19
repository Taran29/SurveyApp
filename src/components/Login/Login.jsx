import React, { useState, useEffect } from 'react'
import TextField from '../../utils/TextField/TextField'
import { Link, useLocation } from 'react-router-dom'
import './Login.css'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const location = useLocation()

  useEffect(() => {
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
      let message = await result.json()
      console.log(message.message)
      console.log(result.headers.get('x-auth-token'))
      return
    }
  }

  return (
    <div className="login-container">
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
        onClick={btnSubmitFunction}
      >Login</button>

      <span className='registerText'>
        Not a user? Sign in <Link to="/register" className="registerRoute">here!</Link>
      </span>
    </div>
  )
}

export default Login
