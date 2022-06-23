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

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!location.state) {
      navigate('/createSurvey')
    }
  }, [])

  const createSurvey = () => {
    const survey = {
      title: location.state.title,
      category: location.state.category,
      creator: (JSON.parse(localStorage.getItem('user'))).id,
      questions: {
        questions: questions,
        options: options
      }
    }

    console.log(survey)
  }

  return (
    <div className="add-questions-container">
      <div> Survey title: {location.state.title}</div>
      <div> Survey category: {location.state.category}</div>

      {(!stopOptions && !inputQuestion) ?
        <>
          <TextField
            type="text"
            placeholder="Enter option..."
            value={option || ''}
            setValue={setOption}
          />
          <button
            type="button"
            className='submitBtn'
            onClick={() => {
              setCurrentOptions([...currentOptions, option])
              setOption('')
            }}
          >Add</button>

          <button
            type="button"
            className='submitBtn'
            onClick={() => {
              setOptions([...options, currentOptions])
              setQuestion('')
              setCurrentOptions('')
              setInputQuestion(true)
              setStopOptions(true)
            }}
          >Stop</button>
        </>
        : null}
      {(stopOptions && !inputQuestion) ?
        <>
          <button
            type="button"
            className='submitBtn'
            onClick={() => setInputQuestion(true)}
          >Add Question</button>
          <button
            type="button"
            className='submitBtn'
            onClick={() => setStopOptions(true)}
          >Submit</button>
        </> : null
      }

      {inputQuestion ?
        <>
          <TextField
            type="text"
            placeholder="Enter question..."
            value={question || ''}
            setValue={setQuestion}
          />
          <button
            type="button"
            className="submitBtn"
            onClick={() => {
              setQuestions([...questions, question])
              setInputQuestion(false)
              setStopOptions(false)
            }}
          >Add options</button>
          <button
            type="submit"
            className="submitBtn"
            onClick={createSurvey}
          >Create Survey</button>
        </> : null
      }
    </div >
  )
}

export default AddQuestions