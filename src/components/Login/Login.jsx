import React, { useState, useEffect } from 'react'
import TextField from '../../utils/TextField/TextField'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Loading from '../../utils/Loading/Loading'
import './Login.css'

const Login = ({ setExistingUser }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [isConnection, setIsConnection] = useState(true)

  const [loading, setLoading] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('auth-token') && localStorage.getItem('user')) {
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
    setLoading(true)
    const user = {
      email: email,
      password: password
    }
    try {
      const result = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      if (result.status === 400) {
        setInvalid(true)
        return
      }

      const response = await result.json()

      if (result.status === 200) {
        setInvalid(false)
        localStorage.setItem('auth-token', result.headers.get('x-auth-token'))
        localStorage.setItem('user', JSON.stringify({
          id: response.result._id,
          name: response.result.name,
          email: response.result.email
        }))
        setExistingUser(true)
        if (location.state && location.state.id) {
          let isFilled = false
          for (const survey of response.result.filledSurveys) {
            if (location.state.id === survey.surveyID) {
              isFilled = true
              break
            }
          }
          if (isFilled) navigate(`/filledSurvey/${location.state.id}`)
          if (!isFilled) navigate(`/fillSurvey/${location.state.id}`)
          return
        }
        navigate('/home')
      }
    } catch (ex) {
      setIsConnection(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="login-container" onSubmit={e => btnSubmitFunction(e)}>
      {!loading && isConnection &&
        <>
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

          {invalid && <span className='error-text'>Either email or password is incorrect.</span>}
          <span className='forgot-pw-text'>
            <Link to="/forgotPassword" className='registerRoute'>Forgot Password?</Link>
          </span>

          <button
            type="submit"
            className="submitBtn"
          >Login</button>

          <span className='registerText'>
            Not a user? Sign up <Link to="/register" className="registerRoute">here!</Link>
          </span>
        </>
      }
      {loading && <Loading />}
      {!isConnection && <span>Cannot connect to the server right now, please try again later.</span>}
    </form>
  )
}

export default Login
