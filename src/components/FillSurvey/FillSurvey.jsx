import { useEffect, useState } from 'react'
import { useParams, useNavigate, } from 'react-router-dom'
import Loading from '../../utils/Loading/Loading'
import './FillSurvey.css'

const FillSurvey = () => {

  const [survey, setSurvey] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const [isConnection, setIsConnection] = useState(true)
  const [isUser, setIsUser] = useState(true)

  const [surveyNotFound, setSurveyNotFound] = useState(false)
  const [isCreator, setIsCreator] = useState(false)

  const [userSelections, setUserSelections] = useState({})
  const [notFilled, setNotFilled] = useState(false)

  let { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      setIsLoading(false)
      setIsUser(false)
      return
    }

    const getSurvey = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/survey/${id}`, {
          method: 'GET',
          headers: {
            'x-auth-token': localStorage.getItem('auth-token')
          }
        })

        if (response.status === 307) {
          navigate(`/stats/${id}`)
        }

        if (response.status === 400) {
          setSurveyNotFound(true)
        }

        if (response.status === 401) {
          setIsCreator(true)
        }

        if (response.status === 200) {
          const result = await response.json()
          setSurvey(result.body)
        }
      } catch (ex) {
        setIsConnection(false)
      } finally {
        setIsLoading(false)
      }
    }

    getSurvey()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const updateOption = (index, idx) => {
    let selections = userSelections
    selections[index] = idx
    setUserSelections(selections)
  }

  const submitSurvey = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (Object.keys(userSelections).length !== survey.questions.length) {
      setNotFilled(true)
      return
    }
    setNotFilled(false)

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/survey/fill/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify({
          userSelections: userSelections
        })
      })

      if (response.status === 502) {
        alert('Could not connect to our database. Please try again later.')
        return
      }

      if (response.status === 200) {
        navigate('/home')
      }
    } catch (ex) {
      setIsConnection(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className='fill-container' onSubmit={(e) => submitSurvey(e)}>
      {!isCreator && !surveyNotFound && isConnection && isUser && !isLoading &&
        <div className='fill-wrapper'>
          <h2 className='fill-title'> {survey.title} </h2>
          <p className='fill-category'> {survey.category} </p>

          {survey.questions.map((question, index) => {
            return (
              <div key={index} className='fill-question-container'>
                <span className='fill-question'> {question.question} </span>
                {question.options.map((opt, idx) => {
                  return (
                    <div className="fill-options-container" key={idx}>
                      <div key={idx} className='fill-options'>
                        <input
                          type="radio"
                          name={`option${index}`}
                          className='radio-button'
                          onChange={() => updateOption(index, idx)}
                        />
                        <label htmlFor={`option${index}`} className='radio-label'> {opt.option} </label>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}

          {notFilled && <span className='error-text'>All questions are required</span>}

          <div className='fill-button-wrapper'>
            <button
              type='submit'
              className='submitBtn fill-button'
            >Submit</button>
            <button
              type='reset'
              className='submitBtn fill-button'
            >Reset</button>
          </div>
        </div>
      }

      {isLoading && <Loading />}
      {isCreator && <span>You cannot fill your own survey.</span>}
      {surveyNotFound && <span>Bad request. Could not find survey with given ID.</span>}
      {!isConnection && <span>Cannot connect to the server right now. Please check your network connection or try again later.</span>}
      {!isUser &&
        <div className='no-user'>
          <span>You need to be logged in to fill this survey.</span>
          <button
            className='submitBtn no-user-button'
            onClick={() => navigate('/login', { state: { path: `/fillSurvey/${id}` } })}
          >Login</button>
        </div>
      }
    </form>
  )
}

export default FillSurvey