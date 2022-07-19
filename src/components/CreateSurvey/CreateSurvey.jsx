import { useState } from 'react'
import TextField from '../../utils/TextField/TextField'
import { useNavigate } from 'react-router-dom'
import './CreateSurvey.css'

const CreateSurvey = () => {

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')

  const [invalidTitle, setInvalidTitle] = useState(false)
  const [invalidCategory, setInvalidCategory] = useState(false)

  const [isPrivate, setIsPrivate] = useState(false)

  const navigate = useNavigate()

  const formSubmitFunction = (e) => {
    e.preventDefault()

    if (title.length === 0) {
      setInvalidTitle(true)
      return
    } else setInvalidTitle(false)
    if (category.length === 0) {
      setInvalidCategory(true)
      return
    } else setInvalidCategory(false)

    navigate('/addQuestions', { state: { title: title, category: category, isPrivate: isPrivate } })
  }

  const setPrivacy = (e) => {
    if (e.target.id === 'private') {
      setIsPrivate(true)
      return
    }
    setIsPrivate(false)
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
      {invalidTitle && <span className='error-text'>Title cannot be empty</span>}

      <TextField
        type="text"
        placeholder="Enter category..."
        value={category || ''}
        setValue={setCategory}
      />
      {invalidCategory && <span className='error-text'>Category cannot be empty</span>}

      <div className='radio-group'>
        <div>
          <input
            type="radio"
            name="private"
            id="public"
            onChange={(e) => setPrivacy(e)}
            checked={true}
          />
          <label htmlFor='public' >Public (default)</label>
        </div>

        <div>
          <input
            type="radio"
            name="private"
            id="private"
            onChange={(e) => setPrivacy(e)}
          />
          <label htmlFor="private">Private</label>
        </div>

      </div>

      <button
        type="submit"
        className='submitBtn'
        onClick={e => formSubmitFunction(e)}
      >Add Questions</button>
    </form >
  )
}

export default CreateSurvey