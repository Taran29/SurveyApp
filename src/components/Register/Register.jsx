import { useState } from 'react'
import TextField from '../../utils/TextField/TextField.jsx'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [emptyFields, setEmptyFields] = useState(false)

  const navigate = useNavigate()

  const btnSubmitFunction = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordMatch(false)
      console.log('Passwords do not match')
      return
    }

    if ([name, email, password, confirmPassword].includes('')) {
      setEmptyFields(true)
      console.log('Fields cannot be empty')
      return
    }
    const user = {
      name: name,
      email: email,
      password: password
    }

    navigate('/security', { state: { user } })
  }

  const onFocusOutPassword = () => {
    if ((password.length === 0) || (confirmPassword.length) === 0) {
      setPasswordMatch(true)
    }

    if ((password.length > 0) && (confirmPassword.length) > 0)
      setPasswordMatch(password === confirmPassword)
  }

  return (
    <form className="register-container" onSubmit={e => btnSubmitFunction(e)}>
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
        setValue={password => setPassword(password)}
        onFocusOut={onFocusOutPassword}
      />
      <TextField
        type="password"
        placeholder="Confirm your password..."
        value={confirmPassword || ''}
        setValue={confirmPassword => setConfirmPassword(confirmPassword)}
        onFocusOut={onFocusOutPassword}
      />

      {emptyFields ?
        <span className="empty-fields">
          Fields cannot be empty
        </span> : <></>
      }

      {!passwordMatch ?
        <span className="passwords-no-match">
          Passwords do not match
        </span> : <></>
      }

      <button
        type="submit"
        className="submitBtn"
      >Next</button>

      <span className='loginText'>
        Already a user? Log in <Link to="/login" className="loginRoute">here!</Link>
      </span>
    </form>
  )
}

export default Register