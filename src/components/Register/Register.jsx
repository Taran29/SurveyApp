import { useState, useEffect } from 'react'
import TextField from '../../utils/TextField/TextField.jsx'
import PasswordInput from '../../utils/PasswordInput/PasswordInput.jsx'
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

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      navigate('/home')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const btnSubmitFunction = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordMatch(false)
      console.log('Passwords do not match')
      return
    }

    if (password.length < 8) {
      alert('Password cannot be less than 8 characters long')
      setPassword('')
      setConfirmPassword('')
      return
    }

    if (password.length > 24) {
      alert('Password cannot be greater than 24 characters long')
      setPassword('')
      setConfirmPassword('')
      return
    }

    if ([name, email, password, confirmPassword].includes('')) {
      setEmptyFields(true)
      return
    }
    const user = {
      name: name,
      email: email,
      password: password
    }

    navigate('/security', { state: { user } })
  }

  return (
    <form className="register-container" onSubmit={e => btnSubmitFunction(e)} >
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

      <PasswordInput
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        passwordMatch={passwordMatch}
        setPasswordMatch={setPasswordMatch}
      />

      {emptyFields ?
        <span className="empty-fields">
          Fields cannot be empty
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