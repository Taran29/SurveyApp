import { useState } from 'react'
import './Register.css'


const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className="register-container">
      <span className='register-title'>Register</span>
      <input
        type="text"
        placeholder="Enter your name..."
        value={name || ''}
        onChange={(event) => {
          setName(event.target.value)
        }}
      /><br />
      <input
        type="email"
        placeholder="Enter your email..."
        value={email || ''}
        onChange={(event) => {
          setEmail(event.target.value)
        }}
      /><br />
      <input
        type="password"
        placeholder="Enter a new password..."
        value={password || ''}
        onChange={(event) => {
          setPassword(event.target.value)
        }}
      /><br />
      <input
        type="password"
        placeholder="Confirm your password..."
        value={confirmPassword || ''}
        onChange={(event) => {
          setConfirmPassword(event.target.value)
        }}
      /><br />
      <button
        type="submit"
        className="submitBtn"
        onClick={async () => {
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
        }}
      >Submit</button>

      <span className='loginText'>
        Already a user? Log in <a href="/">here!</a>
      </span>
    </div>
  )
}

export default Register