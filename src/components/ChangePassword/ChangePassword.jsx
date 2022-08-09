import { useState, useEffect } from 'react'
import {
  VerifyAnswer,
  UpdatePassword
} from '../../utils/ForgotPasswordUtils'
import { useNavigate } from 'react-router-dom'
import './ChangePassword.css'
import Loading from '../../utils/Loading/Loading'

const ChangePassword = () => {

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [inValidAnswer, setInvalidAnswer] = useState(false)
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)

  const [allowNewPassword, setAllowNewPassword] = useState(false)

  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('user') || !localStorage.getItem('auth-token')) {
      localStorage.removeItem('user')
      localStorage.removeItem('auth-token')
      navigate('/login')
    }

    const getQuestion = async () => {
      let email = (JSON.parse(localStorage.getItem('user'))).email
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/forgotPassword/user/${email}`, {
          method: 'GET',
        })

        const result = await response.json()
        setQuestion(result.securityQuestion)
      } catch (ex) {
        alert('Cannot connect to the database.')
      } finally {
        setLoading(false)
      }
    }

    getQuestion()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='change-pw-container'>
      <>
        {!loading &&
          <>
            <h2>Change your password</h2>
            {(!allowNewPassword) &&
              <VerifyAnswer
                question={question}
                answer={answer}
                setAnswer={setAnswer}
                inValidAnswer={inValidAnswer}
                setInvalidAnswer={setInvalidAnswer}
                email={(JSON.parse(localStorage.getItem('user'))).email}
                setToken={setToken}
                setAllowNewPassword={setAllowNewPassword}
              />
            }

            {(allowNewPassword) &&
              <UpdatePassword
                token={token}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmNewPassword={confirmNewPassword}
                setConfirmNewPassword={setConfirmNewPassword}
                isLoggedIn={true}
              />
            }
          </>
        }
        {loading && <Loading />}
      </>
    </div>
  )
}

export default ChangePassword