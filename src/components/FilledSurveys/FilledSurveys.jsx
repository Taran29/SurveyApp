import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageControls from '../../utils/PageControls/PageControls'
import Loading from '../../utils/Loading/Loading'
import './FilledSurveys.css'

const FilledSurveys = () => {

  const [loading, setLoading] = useState(true)
  const [filledSurveys, setFilledSurveys] = useState([])

  const [pageNumber, setPageNumber] = useState()
  const [totalPages, setTotalPages] = useState('')
  const [aboveTotal, setAboveTotal] = useState(false)

  const navigate = useNavigate()
  let { page } = useParams()

  useEffect(() => {
    setAboveTotal(false)
    if (isNaN(parseInt(page)) || parseInt(page) < 1) {
      setPageNumber(1)
      // eslint-disable-next-line
      page = 1
      navigate(`/filledSurveys/page/${1}`)
    } else {
      setPageNumber(parseInt(page))
    }

    const getFilledSurveys = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/profile/filledSurveys/page/${pageNumber}`, {
        method: 'GET',
        headers: {
          'x-auth-token': localStorage.getItem('auth-token')
        }
      })
      const result = await response.json()
      setFilledSurveys(result.body.surveys)
      setTotalPages(result.body.totalPages)
      if (parseInt(page) > result.body.totalPages) {
        setAboveTotal(true)
      }
      setLoading(false)
    }

    getFilledSurveys()
  }, [pageNumber])

  return (
    <div className='filled-surveys-container'>
      {!loading && !aboveTotal &&
        <>
          <h2>Filled Surveys</h2>
          {filledSurveys.length > 0 && filledSurveys.map((survey, idx) => {
            return (
              <div key={idx} className='home-survey filled-survey'>
                <div className='home-survey-meta'>
                  <span className='home-survey-title'>{survey.title}</span>
                  <span className='home-survey-category'>{survey.category}</span>
                </div>
                <button
                  className='submitBtn fill-survey-btn'
                  onClick={() => navigate(`/filledSurvey/${survey._id}`)}
                >View</button>
              </div>
            )
          })}

          <PageControls
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalPages={totalPages}
            baseNavigate={'filledSurveys'}
          />
        </>
      }

      {aboveTotal && pageNumber > 1 && <div className='warning-text'>Invalid request. URL exceeds maximum page number.</div>}
      {
        aboveTotal && filledSurveys.length === 0 && pageNumber === 1 &&
        <div className='warning-text'>
          You haven't filled any surveys yet. Press Home in the navbar to start filling!
        </div>
      }

      {loading && <Loading />}
    </div >
  )
}

export default FilledSurveys