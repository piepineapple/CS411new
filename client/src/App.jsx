import React, { useState } from 'react';
import { useEffect } from 'react';

function App() {

  // Google oAuth 
  const google = window.google;

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential)
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "358020241759-h8p3kof54voihbcqhqpk7ev2v70ualf4.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("sign-in-div"),
      { theme: "outline", size: "large" }
    )

  }, []);

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
      <div id="sign-in-div"> </div>
    </div>
  );
}

export default App;
