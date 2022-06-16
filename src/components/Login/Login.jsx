import React, { useState } from 'react'
import TextField from '../../utils/TextField/TextField'
import './Login.css'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    let message = await result.json()
    console.log(message.message)
    console.log(result.headers.get('x-auth-token'))
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

      <button
        type="submit"
        className="submitBtn"
        onClick={btnSubmitFunction}
      >Login</button>

      <span className='registerText'>
        Not a user? Sign in <a href="/">here!</a>
      </span>
    </div>
  )
}

export default Login
