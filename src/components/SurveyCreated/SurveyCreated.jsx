import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './SurveyCreated.css'

const SurveyCreated = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const [survey, setSurvey] = useState({})
  const [isPrivate, setIsPrivate] = useState(false)

  const [copyButtonText, setCopyButtonText] = useState('Copy')

  const surveyUrl = `${process.env.REACT_APP_BASE_URL}/survey/${survey._id}`

  useEffect(() => {
    if (location.state.survey) {
      setSurvey(location.state.survey)
      setIsPrivate(location.state.survey.private)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onCopy = () => {
    navigator.clipboard.writeText(surveyUrl)
    setCopyButtonText('Copied')
  }

  return (
    <div className='survey-created-container'>
      <span className='survey-created-message'>Survey Created!</span>
      <span className='survey-title'> {survey.title} </span>
      <span className='survey-category'> {survey.category} </span>

      <span className='survey-link'> {surveyUrl} </span>

      {isPrivate ?
        <span>Only people with this link can view.</span>
        :
        <span>Your survey is visible to everyone. Share it using the link above.</span>
      }

      <div className="button-wrapper">
        <button
          type="button"
          onClick={onCopy}
          className='submitBtn'
        >{copyButtonText}</button>
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="submitBtn"
        >Back to Home</button>
      </div>
    </div>
  )
}

export default SurveyCreated