import { useState } from 'react'
import TextField from '../../utils/TextField/TextField'
import { useNavigate } from 'react-router-dom'
import './CreateSurvey.css'

const CreateSurvey = () => {

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [question, setQuestion] = useState('')
  const [option, setOption] = useState('')
  const [questions, setQuestions] = useState([])
  const [options, setOptions] = useState([])
  const [inputQuestion, setInputQuestion] = useState(false)
  const [inputOption, setInputOption] = useState(false)

  const navigate = useNavigate()

  return (
    <form className='create-survey-container'>
      <span className='create-survey-title'>Create Survey</span>
      <TextField
        type="text"
        placeholder="Enter survey title..."
        value={title || ''}
        setValue={setTitle}
      />
      <TextField
        type="text"
        placeholder="Enter category..."
        value={category || ''}
        setValue={setCategory}
      />

      <button
        type="submit"
        className='submitBtn'
        onClick={() => navigate('/addQuestions', { state: { title: title, category: category } })}
      ></button>

      {/* {questions.length > 0 ? questions.map((ques, idx) => {
        return (
          <div key={idx}>{ques}: {options[idx]}</div>
        )
      }) : null}

      {options.length > 0 ? options.map((opt, idx) => {
        return (
          <div key={idx}>
            {question}
            {opt}
          </div>
        )
      }) : null}

      {inputOption ?
        <>
          <TextField
            type='text'
            placeholder='Enter option...'
            value={option || ''}
            setValue={setOption}
          />
          <button
            className='submitBtn'
            onClick={() => {
              setOptions([...options, option])
              setOption('')
              setInputOption(false)
            }}
          >Add option</button>
        </>
        :
        <>
          {inputQuestion ?
            <>
              <TextField
                type="text"
                placeholder="Enter question title..."
                value={question || ''}
                setValue={setQuestion}
              />

              <button
                type="text"
                className='submitBtn'
                onClick={() => {
                  setQuestions([...questions, question])
                  setQuestion('')
                  setInputOption(true)
                }}
              >Add option</button>

              <button
                type='button'
                className='submitBtn'
                onClick={() => {
                  setQuestions([...questions, question])
                  setQuestion('')
                  setInputQuestion(false)
                }}>Add</button>
            </>
            :
            <>
              <button
                type='button'
                className='submitBtn'
                onClick={() => setInputQuestion(true)}
              >Add question</button>
            </>
          } </>} */}

      {/* {inputQuestion ?
        <>
          <TextField
            type="text"
            placeholder="Enter question title..."
            value={question || ''}
            setValue={setQuestion}
          />
          {!inputOption ?
            <>


              <button
                type="text"
                className='submitBtn add-option-btn'
                onClick={() => {
                  setInputOption(true)
                }}
              >Add option</button>
            </>
            :
            <>
              <span>{question}</span>
              <TextField
                type="text"
                placeholder="Enter option..."
                value={option || ''}
                setValue={setOption}
              />
              <button
                type="button"
                className='submitBtn add-option-btn'
                onClick={() => {
                  setOptions([...options, option])
                  setOption('')
                  setInputOption(false)
                }}
              >Add option</button>
            </>
          }

          <button
            type="button"
            className='submitBtn add-question-btn'
            onClick={() => {
              setQuestions([...questions, question])
              setQuestion('')
              setInputQuestion(false)
            }}
          >Add Question</button>
        </>
        :
        <>
          <button
            type="button"
            className='submitBtn add-question-btn'
            onClick={() => setInputQuestion(true)}
          >Add a new question</button>
        </>
      } */}
    </form>
  )
}

export default CreateSurvey