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
  const [emptyEmail, setEmptyEmail] = useState(false)

  const emailSubmitFunction = async () => {
    if (email === '') {
      console.log('bruhhh')
      setEmptyEmail(true)
      return
    }
    setLoading(true)
    setEmptyEmail(false)
    try {
      const result = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/forgotPassword/user/${email}`, {
        method: 'GET',
      })
      const response = await result.json()

      if (result.status === 200) {
        setIsInvalidEmail(false)
        setQuestion(response.securityQuestion)
        setShowForm(true)
      }

      if (result.status === 400) {
        setIsInvalidEmail(true)
      }
      setLoading(false)
    } catch (error) {
      alert('Cannot connect to the server right now, please try again later')
    }
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

          {emptyEmail && <span className='error-text'>Email cannot be empty</span>}

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