import { useState } from 'react'
import './ForgotPassword.css'
import { Link } from 'react-router-dom'
import {
  VerifyEmail,
  VerifyAnswer,
  UpdatePassword
} from '../../utils/ForgotPasswordUtils/index'

const ForgotPassword = () => {

  const [email, setEmail] = useState('')

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const [showForm, setShowForm] = useState(false)

  const [isInvalidEmail, setIsInvalidEmail] = useState(false)
  const [inValidAnswer, setInvalidAnswer] = useState(false)

  const [allowNewPassword, setAllowNewPassword] = useState(false)
  const [token, setToken] = useState('')

  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  return (
    <div className='forgot-pw-container'>
      <span className='forgot-pw-title'>Forgot Password?</span>
      {(!showForm && !allowNewPassword) ?
        <VerifyEmail
          email={email}
          setEmail={setEmail}
          setQuestion={setQuestion}
          setShowForm={setShowForm}
          setIsInvalidEmail={setIsInvalidEmail}
        />
        : <></>
      }

      {(showForm && !allowNewPassword) ?
        <VerifyAnswer
          question={question}
          answer={answer}
          setAnswer={setAnswer}
          inValidAnswer={inValidAnswer}
          setInvalidAnswer={setInvalidAnswer}
          email={email}
          setToken={setToken}
          setAllowNewPassword={setAllowNewPassword}
        /> : <></>
      }

      {allowNewPassword ?
        <UpdatePassword
          token={token}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmNewPassword={confirmNewPassword}
          setConfirmNewPassword={setConfirmNewPassword}
        />
        : <></>}

      {(isInvalidEmail && !allowNewPassword) ?
        <div>
          This account does not exist. Please register <Link to="/register">here</Link>
        </div> : <></>
      }
    </div>
  )
}

export default ForgotPassword