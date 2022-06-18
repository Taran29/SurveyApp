import TextField from "../TextField/TextField"

const UpdatePassword = (props) => {

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
      <TextField
        type="password"
        placeholder="Enter new password..."
        value={newPassword || ''}
        setValue={password => setNewPassword(password)}
      />
      <TextField
        type="password"
        placeholder="Confirm new password..."
        value={confirmNewPassword || ''}
        setValue={confirmPassword => setConfirmNewPassword(confirmPassword)}
      />
      <button
        className='submitBtn'
        onClick={setNewPasswordFunction}
      >Submit</button>
    </>
  )
}

export default UpdatePassword