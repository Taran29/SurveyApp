import { useState, useEffect } from 'react'
import TextField from '../../utils/TextField/TextField'
import Dropdown from '../../utils/Dropdown/Dropdown'
import { useNavigate } from 'react-router-dom'
import './CreateSurvey.css'
import Loading from '../../utils/Loading/Loading'

const CreateSurvey = () => {

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])

  const [invalidTitle, setInvalidTitle] = useState(false)
  const [invalidCategory, setInvalidCategory] = useState(false)

  const [isPrivate, setIsPrivate] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {

    if (!localStorage.getItem('auth-token')) {
      setIsLoggedIn(false)
      return
    }
    setIsLoggedIn(true)

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${[process.env.REACT_APP_BASE_URL_API]}/api/category`)
        const result = await response.json()

        setCategories(result.body)
        setLoading(false)
      } catch (ex) {
        alert('Cannot connect to the server right now, please try again later.')
      }
    }
    fetchCategories()
  }, [])

  const formSubmitFunction = (e) => {
    e.preventDefault()
    if (title.length === 0) {
      setInvalidTitle(true)
      return
    } else setInvalidTitle(false)
    let isCategoryValid = false
    for (const item of categories) {
      if (item.category === category) {
        isCategoryValid = true
        break
      }
    }

    if (!isCategoryValid) {
      setInvalidCategory(true)
      setCategory('')
      return
    } else setInvalidCategory(false)

    navigate('/addQuestions', {
      state: {
        title: title,
        category: category,
        isPrivate: isPrivate
      }
    })
  }

  const setPrivacy = (e) => {
    if (e.target.id === 'private') {
      setIsPrivate(true)
      return
    }
    setIsPrivate(false)
  }

  const setPresetCategory = (preset) => {
    setInvalidCategory(false)
    setCategory(preset.category)
    setDropdown(false)
  }

  return (
    <form className='create-survey-container' onSubmit={(e) => formSubmitFunction(e)}>
      {loading && isLoggedIn && <Loading />}
      {!loading && isLoggedIn &&
        <>
          <span className='create-survey-title'>Create Survey</span>
          <TextField
            type="text"
            placeholder="Enter survey title..."
            value={title || ''}
            setValue={setTitle}
          />
          {invalidTitle && <span className='error-text'>Title cannot be empty</span>}

          <Dropdown
            category={category}
            categories={categories}
            setCategory={setCategory}
            dropdown={dropdown}
            setDropdown={setDropdown}
            setPresetCategory={setPresetCategory}
          />

          {invalidCategory && <span className='error-text'>Category has to be selected from the given options.</span>}

          <div className='radio-group'>
            <div>
              <input
                type="radio"
                name="private"
                id="public"
                onChange={(e) => setPrivacy(e)}
                checked={true}
              />
              <label htmlFor='public' >Public</label>
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
        </>
      }

      {!isLoggedIn &&
        <>
          <span className='loginText'>You need to be logged in to create a survey.</span>
          <button
            className='submitBtn'
            onClick={() => navigate('/login', { state: { path: '/createSurvey' } })}
          >Login</button>
        </>
      }
    </form >
  )
}

export default CreateSurvey