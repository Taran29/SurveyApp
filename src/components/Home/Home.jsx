import { useState, useEffect } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

const Home = ({ setExistingUser }) => {

  const [user, setUser] = useState({
    name: '',
    email: ''
  })

  const [surveys, setSurveys] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const getSurveys = async () => {
      let fetchObj = {
        method: 'GET'
      }
      if (localStorage.getItem('auth-token')) {
        fetchObj = {
          method: 'GET',
          headers: {
            'x-auth-token': localStorage.getItem('auth-token')
          }
        }
      }

      const response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/survey/`, fetchObj)

      const result = await response.json()
      setSurveys(result.body)
    }
    getSurveys()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="home-container">
      {surveys.map((survey, idx) => {
        return (
          <div key={idx} className='home-survey'>
            <div className='home-survey-meta'>
              <span className='home-survey-title'> {survey.title} </span>
              <span className='home-survey-category'> {survey.category} </span>
            </div>
            <button
              type="button"
              className='submitBtn fill-survey-btn'
              onClick={() => console.log(idx)}
            >Fill</button>
          </div>
        )
      })}
      <button
        type="button"
        className='submitBtn create-btn'
        onClick={() => navigate('/createSurvey')}
      >Create Survey</button>
    </div>
  )
}

export default Home