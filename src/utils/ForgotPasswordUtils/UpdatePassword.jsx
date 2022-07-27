import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Loading from "../Loading/Loading"
import PasswordInput from "../PasswordInput/PasswordInput"

const UpdatePassword = (props) => {

  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const {
    token,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    isLoggedIn
  } = props

  const setNewPasswordFunction = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordsMatch(false)
      return
    } else setPasswordsMatch(true)

    setLoading(true)

    const response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/forgotPassword/setNewPassword`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-forgot-password-token': token
      },
      body: JSON.stringify({
        newPassword: newPassword
      })
    })

    setLoading(false)

    const result = await response.json()
    if (response.status === 200) {
      if (isLoggedIn) navigate('/profile')
      else navigate('/login', { state: { email: result.result.email } })
    }

    if (response.status === 400) {
      alert(result.message)
      return
    }

    if ((response.status === 401) || (response.status === 402)) {
      alert(result.message)
      navigate('/forgotPassword')
    }
  }

  return (
    <>
      {!loading &&
        <>
          <PasswordInput
            password={newPassword}
            setPassword={setNewPassword}
            confirmPassword={confirmNewPassword}
            setConfirmPassword={setConfirmNewPassword}
            passwordMatch={passwordsMatch}
            setPasswordMatch={setPasswordsMatch}
            setNewPasswordFunction={setNewPasswordFunction}
          />

          <button
            className='submitBtn'
            onClick={setNewPasswordFunction}
          >Submit</button>
        </>
      }

      {loading && <Loading />}
    </>
  )
}

UpdatePassword.defaultProps = {
  isLoggedIn: false
}

export default UpdatePassword