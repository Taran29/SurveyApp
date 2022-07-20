import { useEffect, useState } from 'react'
import TextField from '../../utils/TextField/TextField.jsx'
import { useNavigate } from 'react-router-dom'
import './ChangeName.css'


const ChangeName = () => {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('user') || !localStorage.getItem('auth-token')) {
      localStorage.removeItem('user')
      localStorage.removeItem('auth-token')
      navigate('/login')
    } else {
      setName((JSON.parse(localStorage.getItem('user'))).name)
    }
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  const formSubmit = async (e) => {
    e.preventDefault()

    let user = localStorage.getItem('user')
    user = JSON.parse(user)
    let response
    try {
      response = await fetch(`${process.env.REACT_APP_BASE_URL_API}/api/user/changeName/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify({
          name: name
        })
      })
    } catch (error) {
      alert('Cannot connect to the server. Please try again later')
      return
    }

    if (response.status === 502) {
      alert('Cannot connect to the server. Please try again later')
      return
    }

    if (response.status === 200) {
      user.name = name
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/profile')
    }
  }

  return (
    <form className="change-name-container" onSubmit={e => formSubmit(e)}>
      <span className='change-name-title'>Change your name</span>
      <TextField
        type="text"
        placeholder="Enter your new name..."
        value={name || ''}
        setValue={setName}
        autoFocus={true}
      />
      <button
        type="submit"
        className="submitBtn"
      >Submit</button>
    </form>
  )
}

export default ChangeName