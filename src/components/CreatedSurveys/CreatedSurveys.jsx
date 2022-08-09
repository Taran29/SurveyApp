import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../../utils/Loading/Loading'
import PageControls from '../../utils/PageControls/PageControls'
import './CreatedSurveys.css'

const CreatedSurveys = () => {

  const { page } = useParams()
  const navigate = useNavigate()

  const [createdSurveys, setCreatedSurveys] = useState([])
  const [aboveTotal, setAboveTotal] = useState(false)
  const [pageNumber, setPageNumber] = useState()
  const [totalPages, setTotalPages] = useState()
  const [loading, setLoading] = useState(true)

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
      } finally {
        setLoading(false)
      }
    }
    getSurveys()
  }, [pageNumber]) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='filled-surveys-container'>
      {!loading &&
        <>
          <h2 className='created-surveys-title'>Created Surveys</h2>
          {createdSurveys.length > 0 && createdSurveys.map((survey, index) => {
            return (
              <div
                className='home-survey filled-survey'
                key={index}
                onClick={() => navigate(`/stats/${survey._id}`)}
              >
                <div className="home-survey-meta">
                  <div className="home-survey-title">{survey.title}</div>
                  <div className="home-survey-category">{survey.category}</div>
                </div>
                <button
                  className='submitBtn fill-survey-btn'
                >Stats</button>
              </div>
            )
          })}

          {!aboveTotal && <PageControls
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalPages={totalPages}
            baseNavigate={'createdSurveys'}
          />}
          {aboveTotal && pageNumber > 1 && <div className='warning-text'>Invalid request. URL exceeds maximum page number.</div>}
          {
            createdSurveys.length === 0 && pageNumber === 1 &&
            <div className='warning-text'>
              You haven't created any surveys yet. Press Home in the navbar to start creating!
            </div>
          }
        </>
      }

      {loading && <Loading />}
    </div>
  )
}

export default CreatedSurveys