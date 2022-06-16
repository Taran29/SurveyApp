import './App.css';
import React from 'react';
import { Navbar, Register } from './components';

const App = () => {
  return (
    <div className="App">
      <div className="app-container">
        <Navbar className="nav" />
        <Register className="register" />
      </div>
    </div>
  );
}

export default App;
