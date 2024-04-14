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
  const [processedEntry, setProcessedEntry] = useState('');


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // Clear error message when user starts typing
    setErrorMessage('');
  };

  const handleEnterButtonClick = () => {
    if (inputValue.trim() === '') {
      setErrorMessage('Input needed');
    } else {
      // Send journal entry to backend for preprocessing
      fetch('/process_journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ journal_entry: inputValue })
      })
        // Convert it to json format
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log(response.json())
          return response.json();
        })
        .then(data => {
          // Handle response from backend
          setShowPlaylist(true);
          setProcessedEntry(data.processedEntry);
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error if needed
        });
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
            <p>{processedEntry}</p>
          </div>
        )}
      </div>
      <div id="sign-in-div"> </div>
    </div>
  );
}

export default App;
