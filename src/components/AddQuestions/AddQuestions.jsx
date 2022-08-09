import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  EditableQuestion,
  EditableOption,
  EditableCurrentOption
} from '../../utils/AddQuestionsUtils'
import Loading from '../../utils/Loading/Loading'
import TextField from '../../utils/TextField/TextField'
import './AddQuestions.css'

const AddQuestions = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const [question, setQuestion] = useState('')
  const [questions, setQuestions] = useState([])

  const [option, setOption] = useState('')
  const [currentOptions, setCurrentOptions] = useState([])
  const [options, setOptions] = useState([])

  const [inputOptions, setInputOptions] = useState('')

  const [invalidQuestion, setInvalidQuestion] = useState(false)
  const [invalidOption, setInvalidOption] = useState(false)
  const [invalidNumberOfOptions, setInvalidNumberOfOptions] = useState(false)
  const [loading, setLoading] = useState(false)

  const addQuestion = () => {
    if (question.length === 0) {
      setInvalidQuestion(true)
      return
    }
    setInvalidQuestion(false)
    setQuestions([...questions, question])
    setQuestion('')
    setInputOptions(true)
  }

  const addOption = () => {
    if (option.length === 0) {
      setInvalidOption(true)
      return
    }
    setInvalidOption(false)
    setCurrentOptions([...currentOptions, option])
    setOption('')
  }

  const createSurveyFunction = async () => {
    setLoading(true)
    const finalQuestions = []
    questions.forEach((ques, index) => {
      finalQuestions.push({
        question: ques,
        options: options[index]
      })
    })

    let id = (JSON.parse(localStorage.getItem('user'))).id

    const survey = {
      title: location.state.title,
      category: location.state.category,
      private: location.state.isPrivate,
      questions: finalQuestions,
      createdBy: id,
      createdAt: new Date(Date.now())
    }

    const response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/survey/create`, {
      method: 'POST',
      body: JSON.stringify(survey),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('auth-token')
      }
    })

    const result = await response.json()

    if (response.status === 404 || response.status === 400) {
      alert(result.message)
      return
    }

    if (response.status === 200) {
      navigate('/surveyCreated', { state: { survey: result.result } })
    }
  }

  const ScrollToBottom = () => {
    const ref = useRef()
    useEffect(() => ref.current?.scrollIntoView())
    return <div ref={ref} />
  }

  return (
    <div className="add-questions-container">
      {!loading &&
        <>
          <span className='title-text'> {location.state.title} </span>
          <span className='category-text'> {location.state.category} </span>
          <span className='category-text'> Visibility: {location.state.isPrivate ? 'Private' : 'Public'} </span>
          {questions.length > 0 && questions.map((_, index) => {
            return (
              <div key={index} className='editables' >
                <EditableQuestion
                  setArray={questions}
                  setIndex={index}
                  setter={setQuestions}
                  options={options}
                  setOptions={setOptions}
                  currentOptions={currentOptions}
                  setCurrentOptions={setCurrentOptions}
                  setInputOptions={setInputOptions}
                />
                <span className='editable-option-container'>
                  {options[index] && options[index].length > 0 && options[index].map((_, idx) => {
                    return <EditableOption
                      index={index}
                      optionIndex={idx}
                      options={options}
                      setOptions={setOptions}
                      key={idx}
                    />
                  })}
                  {questions.length - 1 !== index && <hr className='line' />}
                </span>
                {inputOptions && <ScrollToBottom />}
              </div>
            )
          })}

          {!inputOptions
            ?
            <>
              <TextField
                type="text"
                placeholder="Enter question(max 200 chars)..."
                value={question || ''}
                setValue={setQuestion}
                onEnter={addQuestion}
                autoFocus={true}
                maxLength={200}
              />
              {invalidQuestion && <span className='error-text'>Question cannot be empty</span>}

              <div className="button-wrapper">
                <button
                  className='submitBtn'
                  onClick={addQuestion}
                >Add options</button>
                <button
                  className='submitBtn'
                  onClick={createSurveyFunction}
                >Create Survey</button>
              </div>
            </>
            :
            <>
              {currentOptions.length > 0 &&
                <div className='editables current-options'>
                  {currentOptions.map((_, idx) => {
                    return <EditableCurrentOption
                      currentOptions={currentOptions}
                      setCurrentOptions={setCurrentOptions}
                      index={idx}
                      key={idx}
                    />
                  })}
                </div>
              }

              <TextField
                type="text"
                placeholder="Enter option(max 100 chars)..."
                value={option || ''}
                setValue={setOption}
                onEnter={addOption}
                autoFocus={true}
                maxLength={100}
              />
              {invalidOption && <span className='error-text'>Option cannot be empty</span>}

              {invalidNumberOfOptions && <span className='error-text'>Should have at least two options</span>}

              <div className="button-wrapper">
                <button
                  className='submitBtn'
                  onClick={addOption}
                >Add option</button>

                <button
                  className='submitBtn'
                  onClick={() => {
                    if (currentOptions.length < 2) {
                      setInvalidNumberOfOptions(true)
                      return
                    }
                    setInvalidOption(false)
                    setInvalidNumberOfOptions(false)
                    setOptions([...options, currentOptions])
                    setCurrentOptions([])
                    setOption('')
                    setInputOptions(false)
                  }}
                >Add next question</button>
              </div>
            </>
          }
        </>
      }

      {loading && <Loading />}
    </div>
  )
}

export default AddQuestions