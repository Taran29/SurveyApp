import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PieChartComponent from '../../utils/PieChart/PieChart'
import './Stats.css'

const Stats = () => {
  const { surveyID } = useParams()
  const navigate = useNavigate()

  const [survey, setSurvey] = useState({})
  const [loading, setLoading] = useState(true)
  const [copyButtonText, setCopyButtonText] = useState('Copy')

  useEffect(() => {
    const getSurvey = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/profile/stats/${surveyID}`, {
          method: 'GET',
          headers: {
            'x-auth-token': localStorage.getItem('auth-token')
          }
        })
        const result = await response.json()
        setSurvey(result.body.survey)
        setLoading(false)
      } catch (ex) {
        alert('Cannot connect to the server right now.')
      }
    }

    getSurvey()
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  const onCopy = (copyText) => {
    navigator.clipboard.writeText(copyText)
    setCopyButtonText('Copied!')
  }

  const pieChartData = (index) => {
    const data = []
    if (!loading) {
      survey.questions[index].options.forEach((opt) => {
        const obj = {
          name: opt.option,
          value: opt.numberOfTimesChosen
        }
        data.push(obj)
      })
      return data
    }
  }

  return (
    <div className='stats-container'>
      {!loading && survey.numberOfTimesFilled > 0 &&
        <>
          <span>Title: {survey.title}</span>
          <span>Category: {survey.category}</span>
          <span>Number of times filled: {survey.numberOfTimesFilled}</span>
          {survey.questions.map((question, index) => {
            const data = pieChartData(index)
            return (
              <div className='question-stats' key={index}>
                <div className='questions-container'>
                  <span>{question.question}</span>
                  {question.options.map((opt, idx) => {
                    return (
                      <span className='options-container-stats' key={idx}>
                        {opt.option}
                      </span>
                    )
                  })}
                </div>
                <div className='pie-chart'>
                  <PieChartComponent data={data} />
                </div>
              </div>
            )
          })}
        </>
      }
      {!loading && survey.numberOfTimesFilled === 0 &&
        <div className='not-filled'>
          <span>Your survey has not been filled by anyone yet. Share using the link below.</span>
          <span>{`${process.env.REACT_APP_BASE_URL}/survey/${survey._id}`}</span>
          <div className="button-wrapper">
            <button
              type="button"
              onClick={() => onCopy(`${process.env.REACT_APP_BASE_URL}/survey/${survey._id}`)}
              className='submitBtn'
            >{copyButtonText}</button>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="submitBtn"
            >Back to Home</button>
          </div>
        </div>
      }
      {loading && <span>Loading...</span>}
    </div>
  )
}

export default Stats