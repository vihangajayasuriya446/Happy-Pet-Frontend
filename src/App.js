import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the HappyPet</h1>
        <button className='user-button' onClick={() => navigate('/users')}>
          Users
        </button>

        <button className='user-button2' onClick={() => navigate('/mainpage')}>
          Main Page
        </button>
      </header>
    </div>
  );
}

export default App;