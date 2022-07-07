import './App.css';
import { useState, useEffect } from 'react';
import {
  Navbar,
  Register,
  Login,
  Security,
  ForgotPassword,
  Home,
  CreateSurvey,
  AddQuestions,
  SurveyCreated
} from './components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

const App = () => {

  const [existingUser, setExistingUser] = useState(false)

  useEffect(() => {
    const setUser = () => {
      if (localStorage.getItem('auth-token') && localStorage.getItem('user')) {
        setExistingUser(true)
      } else setExistingUser(false)
    }
    setUser()
    window.addEventListener('storage', setUser)
    return () => window.removeEventListener('storage', setUser)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <div className="app-container">
        <Router>
          <Navbar existingUser={existingUser} setExistingUser={setExistingUser} />
          <Routes>
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setExistingUser={setExistingUser} />} />
            <Route path="/security" element={<Security setExistingUser={setExistingUser} />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/home" element={<Home setExistingUser={setExistingUser} />} />
            <Route path="/createSurvey" element={<CreateSurvey />} />
            <Route path="/addQuestions" element={<AddQuestions />} />
            <Route path="/surveyCreated" element={<SurveyCreated />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
