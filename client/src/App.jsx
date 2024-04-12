import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';



function App() {


  const [thoughts, setThoughts] = useState('');
  const handleThoughtsChange = (event) => {
    setThoughts(event.target.value);
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1>Thoughts from today to generate a Spotify playlist: </h1>
        <textarea
          value = {thoughts}
          onChange = {handleThoughtsChange}
          placeholder = "Enter your thoughts here..."
          rows = {4}
          cols = {50}
        />
      </header>
    </div>
  );
}