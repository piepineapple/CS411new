import React, { useState, useEffect } from 'react';

function App() {
  const google = window.google;

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential)
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "358020241759-h8p3kof54voihbcqhqpk7ev2v70ualf4.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("sign-in-div"),
      { theme: "outline", size: "large" }
    );
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
      fetch(`http://localhost:5000/weather?city=${encodeURIComponent(inputValue)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setErrorMessage('');
          setShowPlaylist(true);
          setProcessedEntry(data.processedEntry);
        })
        .catch(error => {
          console.error('Error Fetching The Weather:', error);
          setErrorMessage('Error Fetching The Weather!');
        });
    }
  };

  return (
    <div id="root" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', textAlign: 'center', background: 'linear-gradient(135deg, #FFD700, #ADD8E6, #FFC0CB)' }}>
      <div className="card" style={{ padding: '20px', maxWidth: '400px', width: '80%', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px' }}>
        <h1 style={{ color: '#333' }}>JournalX</h1>
        <div id="sign-in-div" style={{ marginBottom: '10px' }}> </div>
        <input
          type="text"
          placeholder="Enter text here"
          value={inputValue}
          onChange={handleInputChange}
          style={{ margin: '10px', textAlign: 'center', width: '90%', height: '40px', padding: '10px', background: 'rgba(255, 255, 255, 0.8)', border: 'none', borderBottom: '1px solid #ccc', outline: 'none', borderRadius: '5px', color: '#333', fontSize: '20px', fontWeight: 'bold' }}
        />
        <br />
        <button onClick={handleEnterButtonClick} style={{ background: 'transparent', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', color: '#333', fontSize: '18px', boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)' }}>Enter</button>
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
    </div>
  );
}

export default App;
