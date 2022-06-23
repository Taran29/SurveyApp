import { useState } from 'react'
import TextField from '../../utils/TextField/TextField'
import { useNavigate } from 'react-router-dom'
import './CreateSurvey.css'

const CreateSurvey = () => {

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')

  const navigate = useNavigate()

  const formSubmitFunction = (e) => {
    e.preventDefault()
    navigate('/addQuestions', { state: { title: title, category: category } })
  }

  return (
    <form className='create-survey-container' onSubmit={(e) => formSubmitFunction(e)}>
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
        onClick={e => formSubmitFunction(e)}
      >Add Questions</button>
    </form>
  )
}

export default CreateSurvey