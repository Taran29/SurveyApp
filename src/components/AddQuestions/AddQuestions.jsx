import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TextField from '../../utils/TextField/TextField'
import './AddQuestions.css'

const AddQuestions = () => {

  const [inputQuestion, setInputQuestion] = useState(true)
  const [question, setQuestion] = useState('')
  const [questions, setQuestions] = useState([])

  const [stopOptions, setStopOptions] = useState(false)
  const [option, setOption] = useState('')
  const [currentOptions, setCurrentOptions] = useState([])
  const [options, setOptions] = useState([])

  const [focus, setFocus] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      alert('You need to be logged in to access this page')
      navigate('/login')
    }

    if (!location.state) {
      navigate('/createSurvey')
    }

    setTimeout(() => { setFocus(true) }, 1000)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const addNewOption = () => {
    if (option.length === 0) {
      alert('Option cannot be empty')
      return
    }
    setCurrentOptions([...currentOptions, option])
    setOption('')
  }

  const addNewQuestion = () => {
    if ((questions.length === 0) && (question.length === 0)) {
      return
    }
    if (question.length === 0) {
      alert('Question cannot be empty')
      return
    }
    setQuestions([...questions, question])
    setInputQuestion(false)
    setStopOptions(false)
  }

  const createSurvey = () => {
    if (questions.length === 0) {
      alert('You need to have at least 1 question')
      return
    }
    const questionsArray = questions.map((ques, idx) => {
      return {
        question: ques,
        options: options[idx]
      }
    })

    const survey = {
      title: location.state.title,
      category: location.state.category,
      creator: (JSON.parse(localStorage.getItem('user'))).id,
      questions: questionsArray
    }

    console.log(survey)
  }

  return (
    <div className="add-questions-container">
      <div className="survey-title"> Title: {location.state.title}</div>
      <div className="survey-category"> Category: {location.state.category}</div>

      {(!stopOptions && !inputQuestion) ?
        <>
          <span className="option-text">Options for {question}</span>
          <span >
            {currentOptions.length > 0 ? currentOptions.map((opt, idx) => {
              return (
                <div key={idx} className='options'>
                  {idx + 1}. {opt}
                  <span
                    className="remove-option"
                    onClick={() => {
                      setCurrentOptions(oldValue => oldValue.filter((value, index) => index !== idx))
                    }}
                  >❌</span>
                </div>
              )
            }) : null}
          </span>
          <TextField
            type="text"
            placeholder="Enter option..."
            value={option || ''}
            setValue={setOption}
            onEnter={addNewOption}
            autoFocus={true}
          />
          <div className="button-wrapper">
            <button
              type="button"
              className='submitBtn'
              onClick={addNewOption}
            >Add</button>

            <button
              type="button"
              className='submitBtn'
              onClick={() => {
                if (currentOptions.length < 2) {
                  alert('You have to add at least two options')
                  return
                }
                setOptions([...options, currentOptions])
                setQuestion('')
                setCurrentOptions('')
                setInputQuestion(true)
                setStopOptions(true)
              }}
            >Add Next Question</button>
          </div>
        </>
        : null}

      {inputQuestion ?
        <>
          {questions.length > 0 ? questions.map((ques, idx) => {
            return (
              <div key={idx} className='options'>
                {idx + 1}. {ques}
                <div className='question-options'>
                  <span
                    className="remove-option"
                    onClick={() => {
                      setQuestions(oldValue => oldValue.filter((value, index) => index !== idx))
                    }}
                  >❌</span>
                </div>
              </div>
            )
          }) : null}
          <TextField
            type="text"
            placeholder="Enter question..."
            value={question || ''}
            setValue={setQuestion}
            onEnter={addNewQuestion}
            autoFocus={focus}
          />
          <div className='button-wrapper'>
            <button
              type="button"
              className="submitBtn"
              onClick={addNewQuestion}
            >Add options</button>
            <button
              type="submit"
              className="submitBtn"
              onClick={createSurvey}
            >Create Survey</button>
          </div>
        </> : null
      }
    </div >
  )
}

export default AddQuestions