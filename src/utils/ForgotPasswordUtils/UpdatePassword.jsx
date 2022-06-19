import { useState } from "react"
import PasswordInput from "../PasswordInput/PasswordInput"

const UpdatePassword = (props) => {

  const [passwordsMatch, setPasswordsMatch] = useState(true)

  const {
    token,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword
  } = props

  const setNewPasswordFunction = async () => {

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
    console.log(result)
    console.log(response.headers.get('x-auth-token'))
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