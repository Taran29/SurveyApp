import TextField from "../TextField/TextField"

const PasswordInput = (props) => {

  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordMatch,
    setPasswordMatch,
    setNewPasswordFunction
  } = props

  const onFocusOutPassword = () => {
    if ((password.length === 0) || (confirmPassword.length) === 0) {
      setPasswordMatch(true)
    }

    if ((password.length > 0) && (confirmPassword.length) > 0)
      setPasswordMatch(password === confirmPassword)
  }

  return (
    <>
      <TextField
        type="password"
        placeholder="Enter a new password..."
        value={password || ''}
        setValue={password => setPassword(password)}
        onFocusOut={onFocusOutPassword}
        onEnter={setNewPasswordFunction}
        autoFocus={true}
      />
      <TextField
        type="password"
        placeholder="Confirm your password..."
        value={confirmPassword || ''}
        setValue={confirmPassword => setConfirmPassword(confirmPassword)}
        onFocusOut={onFocusOutPassword}
        onEnter={setNewPasswordFunction}
      />

      {!passwordMatch ?
        <span className="passwords-no-match">
          Passwords do not match
        </span> : <></>
      }
    </>
  )
}

export default PasswordInput