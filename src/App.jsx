import './App.css';
import React from 'react';
import { Navbar, Register, Login, Security } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <div className="app-container">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/security" element={<Security />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
