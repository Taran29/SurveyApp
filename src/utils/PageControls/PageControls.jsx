import { useNavigate } from 'react-router-dom'
import './PageControls.css'

const PageControls = ({ pageNumber, setPageNumber, totalPages, baseNavigate }) => {
  const navigate = useNavigate()
  return (
    <div className="page-controls page-controls-fill">
      <button
        className={pageNumber === 1 ? 'page-control-arrow-inactive' : 'page-control-arrow'}
        onClick={() => {
          setPageNumber(prev => prev - 1)
          navigate(`/${baseNavigate}/page/${pageNumber - 1}`)
        }}
      >{`<`}</button>
      <div className="page-number">Page {pageNumber} of {totalPages}</div>
      <button
        className={pageNumber === totalPages ? 'page-control-arrow-inactive' : 'page-control-arrow'}
        onClick={() => {
          setPageNumber(prev => prev + 1)
          navigate(`/${baseNavigate}/page/${pageNumber + 1}`)
        }}
      >{`>`}</button>
    </div>
  )
}

export default PageControls