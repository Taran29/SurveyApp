import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './FillSurvey.css'

const FillSurvey = () => {

  const [survey, setSurvey] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const [isConnection, setIsConnection] = useState(true)
  const [isUser, setIsUser] = useState(true)

  const [surveyNotFound, setSurveyNotFound] = useState(false)
  const [isCreator, setIsCreator] = useState(false)

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

        if (response.status === 400) {
          setIsLoading(false)
          setSurveyNotFound(true)
        }

        if (response.status === 401) {
          setIsLoading(false)
          setIsCreator(true)
        }

        if (response.status === 200) {
          const result = await response.json()
          setSurvey(result.body)
          setIsLoading(false)
        }
      } catch (ex) {
        setIsLoading(false)
        setIsConnection(false)
      }
    }

    getSurvey()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const submitSurvey = () => {

  }

  return (
    <div className='fill-container'>

      {!isCreator && !surveyNotFound && isConnection && isUser && !isLoading &&
        <>
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
                        />
                        <label htmlFor={`option${index}`}> {opt.option} </label>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}

          <div className='button-wrapper'>
            <button
              className='submitBtn'
              onClick={submitSurvey}
            >Submit</button>
            <button
              className='submitBtn'
            >Reset</button>
          </div>
        </>
      }

      {isLoading && <span>Loading...</span>}
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
    </div>
  )
}

export default FillSurvey