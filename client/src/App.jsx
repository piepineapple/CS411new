import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // Clear error message when user starts typing
    setErrorMessage('');
  };

  const handleEnterButtonClick = () => {
    if (inputValue.trim() === '') {
      setErrorMessage('Input needed');
    } else {
      setShowPlaylist(true);
    }
  };

  return (
    <div id="root" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card" style={{ textAlign: 'center' }}>
        <h1>Music & Thoughts Generator</h1>
        <input 
          type="text" 
          placeholder="Enter text here" 
          value={inputValue} 
          onChange={handleInputChange} 
          style={{ margin: '10px' }}
        />
        <br />
        <button onClick={handleEnterButtonClick}>Enter</button>
        {errorMessage && (
          <p style={{ color: 'red' }}>{errorMessage}</p>
        )}
        {showPlaylist && (
          <div>
            <p style={{ marginTop: '20px' }}>Today's Playlist: {inputValue}</p>
            {/* add more playlist items here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
