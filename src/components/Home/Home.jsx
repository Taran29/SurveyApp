import { useState, useEffect } from 'react'
import './Home.css'
import { useNavigate, useParams } from 'react-router-dom'

const Home = () => {

  const [surveys, setSurveys] = useState([])
  const [pageNumber, setPageNumber] = useState()

  const [isConnection, setIsConnection] = useState(true)
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
      navigate(`/home/page/${1}`)
    } else {
      setPageNumber(parseInt(page))
    }

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

      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/survey/page/${page}`, fetchObj)
        const result = await response.json()
        setSurveys(result.body.surveys)
        setTotalPages(result.body.totalPages)
        if (parseInt(page) > result.body.totalPages) {
          setAboveTotal(true)
        }
      } catch (ex) {
        setIsConnection(false)
      }
    }

    getSurveys()
  }, [pageNumber]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="home-container">
      {(isConnection && !aboveTotal) &&
        <>
          <h2 className='home-container-title'>Available Surveys</h2>
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
                  onClick={() => navigate(`/fillSurvey/${surveys[idx]._id}`)}
                >Fill</button>
              </div>
            )
          })}

          <div className="page-controls">
            <button
              className={pageNumber === 1 ? 'page-control-arrow-inactive' : 'page-control-arrow'}
              onClick={() => {
                setPageNumber(prev => prev - 1)
                navigate(`/home/page/${pageNumber - 1}`)
              }}
            >🡐</button>
            <div className="page-number">Page {pageNumber} of {totalPages}</div>
            <button
              className={pageNumber === totalPages ? 'page-control-arrow-inactive' : 'page-control-arrow'}
              onClick={() => {
                setPageNumber(prev => prev + 1)
                navigate(`/home/page/${pageNumber + 1}`)
              }}
            >🡒</button>
          </div>

          <button
            type="button"
            className='submitBtn create-btn'
            onClick={() => navigate('/createSurvey')}
          >➕</button>
        </>
      }

      {!isConnection &&
        <div>Cannot connect to the server right now. Please check your internet connection and try again later.</div>
      }

      {aboveTotal && pageNumber > 1 && <div>Invalid request. URL exceeds maximum page number.</div>}
      {aboveTotal && surveys.length === 0 && pageNumber === 1 &&
        <div>
          Sorry! No public unfilled surveys available at this time.
          <button
            type="button"
            className='submitBtn create-btn'
            onClick={() => navigate('/createSurvey')}
          >➕</button>
        </div>
      }
    </div>
  )
}

export default Home