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
    const response = await fetch('http://localhost:5000/api/forgotPassword', {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
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