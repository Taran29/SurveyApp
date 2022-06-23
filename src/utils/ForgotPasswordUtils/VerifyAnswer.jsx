import TextField from "../TextField/TextField"

const VerifyAnswer = (props) => {
  const {
    question,
    answer,
    setAnswer,
    inValidAnswer,
    setInvalidAnswer,
    email,
    setToken,
    setAllowNewPassword
  } = props


  const verifyAnswer = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/forgotPassword`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        answer: answer
      })
    })

    await response.json()

    if (response.status === 200) {
      setToken(response.headers.get('x-forgot-password-token'))
      setAllowNewPassword(true)
      return
    }

    if (response.status === 401) {
      setInvalidAnswer(true)
      return
    }
  }

  return (
    <>
      <span>Answer the following security question: </span>
      <span>Q. {question}</span>
      <TextField
        type="text"
        placeholder="Enter your security question answer..."
        value={answer || ''}
        setValue={answer => setAnswer(answer)}
      />

      {inValidAnswer ?
        <span className='incorrect-ans'>Answer is incorrect</span> : <></>
      }

      <button
        className='submitBtn'
        onClick={verifyAnswer}
      >
        Next
      </button>
    </>
  )
}

export default VerifyAnswer