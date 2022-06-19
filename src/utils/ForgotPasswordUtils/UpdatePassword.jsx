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
    setConfirmNewPassword
  } = props

  const setNewPasswordFunction = async () => {
    if (!passwordsMatch) {
      return
    }

    const response = await fetch('http://localhost:5000/api/forgotPassword/setNewPassword', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'x-forgot-password-token': token
      },
      body: JSON.stringify({
        newPassword: newPassword
      })
    })

    const result = await response.json()
    if (response.status === 200) {
      alert('Password changed successfully')
      navigate('/login', { state: { email: result.result.email } })
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
      />

      <button
        className='submitBtn'
        onClick={setNewPasswordFunction}
      >Submit</button>
    </>
  )
}

export default UpdatePassword