import './App.css';
import { useState } from 'react';
import {
  Navbar,
  Register,
  Login,
  Security,
  ForgotPassword,
  Home
} from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {

  const [existingUser, setExistingUser] = useState(false)

  return (
    <div className="App">
      <div className="app-container">
        <Router>
          <Navbar existingUser={existingUser} setExistingUser={setExistingUser} />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setExistingUser={setExistingUser} />} />
            <Route path="/security" element={<Security setExistingUser={setExistingUser} />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/home" element={<Home setExistingUser={setExistingUser} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
