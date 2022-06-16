import './App.css';
import React from 'react';
import { Navbar, Register, Login } from './components';

const App = () => {
  return (
    <div className="App">
      <div className="app-container">
        <Navbar />
        {/* <Register /> */}
        <Login />
      </div>
    </div>
  );
}

export default App;
