import { useState } from 'react'
import TextField from '../../utils/TextField/TextField.jsx'
import './Register.css'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const btnSubmitFunction = async () => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match')
      return
    }
    const user = {
      name: name,
      email: email,
      password: password
    }
    let result = await fetch('http://localhost:5000/api/register', {
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
    <div className="register-container">
      <span className='register-title'>Register</span>
      <TextField
        type="text"
        placeholder="Enter your name..."
        value={name || ''}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        type="email"
        placeholder="Enter your email..."
        value={email || ''}
        onChange={(event) => {
          setEmail(event.target.value)
        }}
      />
      <TextField
        type="password"
        placeholder="Enter a new password..."
        value={password || ''}
        onChange={(event) => {
          setPassword(event.target.value)
        }}
      />
      <TextField
        type="password"
        placeholder="Confirm your password..."
        value={confirmPassword || ''}
        onChange={(event) => {
          setConfirmPassword(event.target.value)
        }}
      />
      <button
        type="submit"
        className="submitBtn"
        onClick={btnSubmitFunction}
      >Submit</button>

      <span className='loginText'>
        Already a user? Log in <a href="/">here!</a>
      </span>
    </div>
  )
}

export default Register