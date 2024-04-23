import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import loginPage from './loginPage';
import App from './App';

function MainRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<loginPage />} />
                <Route path="/" element={<App />} />
            </Routes>
        </Router>
    );
}

export default MainRoutes;