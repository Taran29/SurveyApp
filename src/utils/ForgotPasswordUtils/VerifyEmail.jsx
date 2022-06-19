import TextField from "../TextField/TextField"

const VerifyEmail = (props) => {

  const {
    email,
    setEmail,
    setQuestion,
    setShowForm,
    setIsInvalidEmail
  } = props

  const emailSubmitFunction = async () => {
    let response, result
    try {
      result = await fetch(`http://localhost:5000/api/forgotPassword/user/${email}`, {
        method: 'GET',
        mode: 'cors',
      })

      response = await result.json()
    } catch (error) {
      alert('Email cannot be empty')
    }

    console.log(response)

    if (result.status === 200) {
      setIsInvalidEmail(false)
      setQuestion(response.securityQuestion)
      setShowForm(true)
    }

    if (result.status === 400) {
      setIsInvalidEmail(true)
    }
  }

  return (
    <>
      <TextField
        type="email"
        placeholder="Enter your email..."
        value={email || ''}
        setValue={email => setEmail(email)}
      />
      <button
        className='submitBtn'
        onClick={emailSubmitFunction}
      >Next</button>
    </>
  )
}

export default VerifyEmail