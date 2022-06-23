import { useEffect, useState } from "react"
import TextField from "../../utils/TextField/TextField"
import { useLocation, useNavigate } from "react-router-dom"
import './Security.css'

const Security = ({ setExistingUser }) => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      navigate('/home')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const submitFunction = async (e) => {
    e.preventDefault()
    const { name, email, password } = location.state.user

    const user = {
      name: name,
      email: email,
      password: password,
      securityQuestion: question,
      securityAnswer: answer
    }

    let result = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/register`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(user)
    })

    if (result.status === 200) {
      let response = await result.json()
      alert(response.message)
      localStorage.setItem('auth-token', result.headers.get('x-auth-token'))
      localStorage.setItem('user', JSON.stringify({
        id: response.result._id,
        name: response.result.name,
        email: response.result.email
      }))
      setExistingUser(true)
      navigate('/home')
    }
  }

  return (
    <form className="security-container" onSubmit={e => submitFunction(e)}>
      <span className="security-title">Security Question</span>
      <TextField
        type="text"
        placeholder="Enter a security question"
        value={question || ''}
        setValue={question => setQuestion(question)}
      />
      <TextField
        type="text"
        placeholder="Enter the answer"
        value={answer || ''}
        setValue={answer => setAnswer(answer)}
      />
      <button
        type="submit"
        className="submitBtn"
      >Register</button>
    </form>
  )
}

export default Security