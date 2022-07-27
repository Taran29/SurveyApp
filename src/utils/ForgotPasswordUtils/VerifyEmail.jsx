import { useState } from 'react'
import Loading from '../Loading/Loading'
import TextField from "../TextField/TextField"

const VerifyEmail = (props) => {

  const {
    email,
    setEmail,
    setQuestion,
    setShowForm,
    setIsInvalidEmail
  } = props

  const [loading, setLoading] = useState(false)

  const emailSubmitFunction = async () => {
    setLoading(true)
    let response, result
    try {
      result = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/forgotPassword/user/${email}`, {
        method: 'GET',
      })

      response = await result.json()
    } catch (error) {
      alert('Email cannot be empty')
    }

    if (result.status === 200) {
      setIsInvalidEmail(false)
      setQuestion(response.securityQuestion)
      setShowForm(true)
    }

    if (result.status === 400) {
      setIsInvalidEmail(true)
    }
    setLoading(false)
  }

  return (
    <>
      {!loading &&
        <>
          <TextField
            type="email"
            placeholder="Enter your email..."
            value={email || ''}
            setValue={email => setEmail(email)}
            onEnter={emailSubmitFunction}
          />
          <button
            className='submitBtn'
            onClick={emailSubmitFunction}
          >Next</button>
        </>
      }

      {loading && <Loading />}
    </>
  )
}

export default VerifyEmail