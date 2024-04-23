import React, { useState, useEffect } from 'react';

function App() {

  const [inputValue, setInputValue] = useState('');
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [playlistUri, setPlaylistUri] = useState('');
  const [checkClick, setcheckClick] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // Clear error message when user starts typing
    setErrorMessage('');
  };

  const handleSpotifyLogin = () => {
    window.location.href = 'http://localhost:5000/login'; // Only initiate Spotify login
  };

  const handleFetchData = () => {
    if (inputValue.trim() === '') {
      setErrorMessage('Input needed');
      return; // Stop the function if input is empty
    }
    setcheckClick(true); // Will trigger fetching data
  };

  // const handleEnterAndLogin = () => {
  //   if (inputValue.trim() === '') {
  //     setErrorMessage('Input needed');
  //     return; // Stop the function if input is empty
  //   }
  //   window.location.href = 'http://localhost:5000/login' // Initiate Spotify login
  //   setcheckClick(true);
  // };
  // boolean variable to check if the button has been clicked or not. 
  // if the button has been clicked, change the function value to true and add it as a trigger to the useEffect

  useEffect(() => {
    if (checkClick) { // Ensure that fetching only happens if triggered by user action
      fetchWeatherData();
    }
  }, [checkClick]);

  const fetchWeatherData = () => {
    fetch(`http://localhost:5000/weather?city=${encodeURIComponent(inputValue)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(playlistUri => {

        console.log(playlistUri)

        setPlaylistUri(playlistUri);
        setShowPlaylist(true);
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Error Fetching The Weather:', error);
        setErrorMessage('Error Fetching The Weather!');
      });
  };

  const renderSpotifyPlayer = () => {
    if (playlistUri) {
      const playlistId = playlistUri.split(':').pop();
      const src = `https://open.spotify.com/embed/playlist/${playlistId}`;
      return (
        <iframe
          src={src}
          width="300"
          height="380"
          frameBorder="0"
          allowTransparency="true"
          allow="encrypted-media"
          title="Spotify"
        ></iframe>
      );
    }
    return null;
  };

  return (
    <div id="root" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', textAlign: 'center', background: 'linear-gradient(135deg, #FFD700, #ADD8E6, #FFC0CB)' }}>
      <div className="card" style={{ padding: '20px', maxWidth: '400px', width: '80%', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px' }}>
        <h1 style={{ color: '#333' }}>Mood Forecast</h1>
        <div id="sign-in-div" style={{ marginBottom: '10px' }}> </div>
        <input
          type="text"
          placeholder="Enter a location"
          value={inputValue}
          onChange={handleInputChange}
          style={{ margin: '10px', textAlign: 'center', width: '90%', height: '40px', padding: '10px', background: 'rgba(255, 255, 255, 0.8)', border: 'none', borderBottom: '1px solid #ccc', outline: 'none', borderRadius: '5px', color: '#333', fontSize: '20px', fontWeight: 'bold' }}
        />
        <br />
        <button onClick={handleSpotifyLogin} style={{ margin: '10px 10px 10px 0', background: 'transparent', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', color: '#333', fontSize: '18px', boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)' }}>
          Login with Spotify
        </button>
        <button onClick={handleFetchData} style={{ margin: '10px 0 10px 10px', background: 'transparent', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', color: '#333', fontSize: '18px', boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)' }}>
          Get Playlist
        </button>
        {errorMessage && (
          <p style={{ color: 'red' }}>{errorMessage}</p>
        )}
        {showPlaylist && playlistUri && renderSpotifyPlayer()}
      </div>
    </div>
  );
}

export default App;
