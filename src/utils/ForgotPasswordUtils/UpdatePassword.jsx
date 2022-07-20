import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PasswordInput from "../PasswordInput/PasswordInput"

const UpdatePassword = (props) => {

  const [passwordsMatch, setPasswordsMatch] = useState(true)

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

    const result = await response.json()
    if (response.status === 200) {
      alert('Password changed successfully')
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
  )
}

UpdatePassword.defaultProps = {
  isLoggedIn: false
}

export default UpdatePassword