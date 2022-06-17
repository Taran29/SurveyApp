import { useState } from 'react'
import TextField from '../../utils/TextField/TextField.jsx'
import './Register.css'
import { Link } from 'react-router-dom'

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
  }

  return (
    <form className="register-container">
      <span className='register-title'>Register</span>
      <TextField
        type="text"
        placeholder="Enter your name..."
        value={name || ''}
        setValue={name => setName(name)}
      />
      <TextField
        type="email"
        placeholder="Enter your email..."
        value={email || ''}
        setValue={email => setEmail(email)}
      />
      <TextField
        type="password"
        placeholder="Enter a new password..."
        value={password || ''}
        onChange={password => setPassword(password)}
      />
      <TextField
        type="password"
        placeholder="Confirm your password..."
        value={confirmPassword || ''}
        onChange={confirmPassword => setConfirmPassword(confirmPassword)}
      />
      <button
        type="submit"
        className="submitBtn"
        onClick={btnSubmitFunction}
      >Register</button>

      <span className='loginText'>
        Already a user? Log in <Link to="/login" className="loginRoute">here!</Link>
      </span>
    </form>
  )
}

export default Register