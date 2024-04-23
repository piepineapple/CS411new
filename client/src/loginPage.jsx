import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function loginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        // We assume any username and password is correct
        if (username && password) {
            navigate('/');
        } else {
            alert("Please enter both username and password");
        }
    };

    return (
        <div style={{ padding: 20 }}> 
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default loginPage;