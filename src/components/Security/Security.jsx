import { useState } from "react"
import TextField from "../../utils/TextField/TextField"
import { useLocation } from "react-router-dom"
import './Security.css'

const Security = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const location = useLocation()

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

    let result = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(user)
    })

    console.log(result.headers.get('x-auth-token'))
    result = await result.json()
    console.log(result)
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