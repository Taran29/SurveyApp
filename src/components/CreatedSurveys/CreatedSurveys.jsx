import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageControls from '../../utils/PageControls/PageControls'
import './CreatedSurveys.css'

const CreatedSurveys = () => {

  const { page } = useParams()
  const navigate = useNavigate()

  const [createdSurveys, setCreatedSurveys] = useState([])
  const [aboveTotal, setAboveTotal] = useState(false)
  const [pageNumber, setPageNumber] = useState()
  const [totalPages, setTotalPages] = useState()

  useEffect(() => {
    setAboveTotal(false)
    if (isNaN(parseInt(page)) || parseInt(page) < 1) {
      setPageNumber(1)
      navigate(`/filledSurveys/page/${1}`)
    } else {
      setPageNumber(parseInt(page))
    }

    const getSurveys = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/profile/createdSurveys/page/${page}`, {
          method: 'GET',
          headers: {
            'x-auth-token': localStorage.getItem('auth-token')
          }
        })
        const result = await response.json()
        setCreatedSurveys(result.body.createdSurveys)
        setTotalPages(result.body.totalPages)
        if (parseInt(page) > result.body.totalPages) {
          setAboveTotal(true)
        }

      } catch (ex) {
        alert('Cannot connect to the server right now. Please check your internet connection or try again later.')
      }
    }
    getSurveys()
  }, [pageNumber]) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='filled-surveys-container'>
      <h2>Created Surveys</h2>

      {createdSurveys.length > 0 && createdSurveys.map((survey, index) => {
        return (
          <div className='home-survey filled-survey' key={index}>
            <div className="home-survey-meta">
              <div className="home-survey-title">{survey.title}</div>
              <div className="home-survey-category">{survey.category}</div>
            </div>
            <button
              className='submitBtn fill-survey-btn'
              onClick={() => navigate(`/stats/${survey._id}`)}
            >Stats</button>
          </div>
        )
      })}

      <PageControls
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPages={totalPages}
        baseNavigate={'createdSurveys'}
      />
      {aboveTotal && pageNumber > 1 && <div className='warning-text'>Invalid request. URL exceeds maximum page number.</div>}
      {
        createdSurveys.length === 0 && pageNumber === 1 &&
        <div className='warning-text'>
          You haven't filled any surveys yet. Press Home in the navbar to start filling!
        </div>
      }
    </div>
  )
}

export default CreatedSurveys