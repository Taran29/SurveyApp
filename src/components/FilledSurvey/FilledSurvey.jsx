import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './FilledSurvey.css'

const FilledSurvey = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const [survey, setSurvey] = useState({})
  const [selections, setSelections] = useState({})

  useEffect(() => {
    const getSurvey = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/profile/filledSurvey/${id}`, {
        method: 'GET',
        headers: {
          'x-auth-token': localStorage.getItem('auth-token')
        }
      })

      const result = await response.json()
      setSurvey(result.body.survey)
      setSelections(result.body.selections)
    }
    getSurvey()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="filled-survey-container">
      <span className='fill-title'>{survey.title}</span>
      <span className='fill-category'>{survey.category}</span>

      {survey.questions && survey.questions.length > 0 && survey.questions.map((question, index) => {
        return (
          <div key={index} className='fill-question-container'>
            <span>{question.question}</span>
            <div className="options-container">
              {question.options.map((option, idx) => {
                return <span
                  key={idx}
                  className={selections[index].option === idx ? 'selected-option' : 'unselected-option'}
                >{option.option}</span>
              })}
            </div>
          </div>
        )
      })}

      <div className="button-wrapper">
        <button
          className='submitBtn filled-survey-button'
          onClick={() => navigate(-1)}
        >Back</button>
        <button
          className='submitBtn filled-survey-button'
          onClick={() => navigate('/home')}
        >Home</button>
      </div>
    </div>
  )
}

export default FilledSurvey