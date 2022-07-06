import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  EditableQuestion,
  EditableOption,
  EditableCurrentOption
} from '../../utils/AddQuestionsUtils'
import TextField from '../../utils/TextField/TextField'
import './AddQuestions.css'

const AddQuestions = () => {

  const location = useLocation()

  const [question, setQuestion] = useState('')
  const [questions, setQuestions] = useState([])

  const [option, setOption] = useState('')
  const [currentOptions, setCurrentOptions] = useState([])
  const [options, setOptions] = useState([])

  const [inputOptions, setInputOptions] = useState('')

  const addQuestion = () => {
    setQuestions([...questions, question])
    setQuestion('')
  }

  const createSurveyFunction = () => {
    const finalQuestions = []
    questions.forEach((ques, index) => {
      let q = {
        question: ques,
        options: options[index]
      }
      finalQuestions.push(q)
    })

    let id = JSON.parse(localStorage.getItem('user'))
    id = id.id

    const survey = {
      title: location.state.title,
      category: location.state.category,
      questions: finalQuestions,
      createdBy: id,
      createdAt: new Date(Date.now())
    }

    console.log(survey)
  }

  return (
    <div className="add-questions-container">
      <span className='title-text'> {location.state.title} </span>
      <span className='category-text'> {location.state.category} </span>
      {questions.length > 0 && questions.map((_, index) => {
        return (
          <div key={index} className='editables'>
            <EditableQuestion
              setArray={questions}
              setIndex={index}
              setter={setQuestions}
              setOptions={setOptions}
              setCurrentOptions={setCurrentOptions}
              setInputOptions={setInputOptions}
            />
            <span className='editable-option-container'>
              {options[index] && options[index].length > 0 && options[index].map((opt, idx) => {
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
          </div>
        )
      })}

      {!inputOptions
        ?
        <>
          <TextField
            type="text"
            placeholder="Enter question..."
            value={question || ''}
            setValue={setQuestion}
            onEnter={addQuestion}
          />

          <div className="button-wrapper">
            <button
              className='submitBtn'
              onClick={() => {
                setQuestions([...questions, question])
                setQuestion('')
                setInputOptions(true)
              }}
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
                // return <span key={idx} className='editable-current-options'> {idx + 1}. {curr} </span>
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
            placeholder="Enter option..."
            value={option || ''}
            setValue={setOption}
          />

          <div className="button-wrapper">
            <button
              className='submitBtn'
              onClick={() => {
                setCurrentOptions([...currentOptions, option])
                setOption('')
              }}
            >Add option</button>

            <button
              className='submitBtn'
              onClick={() => {
                setOptions([...options, currentOptions])
                setCurrentOptions([])
                setOption('')
                setInputOptions(false)
              }}
            >Add next question</button>
          </div>
        </>
      }
    </div>
  )
}

export default AddQuestions