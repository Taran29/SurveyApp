import { useNavigate } from 'react-router-dom'
import './Profile.css'

const Profile = ({ setExistingUser }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const logoutFunction = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user')
    setExistingUser(false)
    navigate('/login')
  }

  return (
    <div className='profile-container'>
      <div className='user-info'>Name: {user.name}</div>
      <div className='user-info'>Email: {user.email}</div>
      <div className="profile-item">
        <div className='user-action'>Created Surveys</div>
        <span>&gt;</span>
      </div>
      <div className="profile-item">
        <div className='user-action'>Filled Surveys</div>
        <span>&gt;</span>
      </div>
      <div className="profile-item">
        <div className='user-action'>Change Name</div>
        <span>&gt;</span>
      </div>
      <div className="profile-item">
        <div className='user-action'>Change Password</div>
        <span>&gt;</span>
      </div>
      <div className="button-wrapper profile-button-wrapper">
        <button className='submitBtn profile-button' onClick={logoutFunction}>Logout</button>
        <button className='submitBtn profile-button'>Delete account</button>
      </div>
    </div>
  )
}

export default Profile