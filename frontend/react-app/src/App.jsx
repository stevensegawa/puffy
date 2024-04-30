import React, { useEffect } from 'react';
import axios from 'axios';  // Import axios to set up default headers
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import PuffyChat from './PuffyChat';

function App() {
  useEffect(() => {
    // Fetch the token from local storage
    const token = localStorage.getItem('token');
    // If there is a token, update the axios default header
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/puffychat" element={<PuffyChat />} />
      </Routes>
    </Router>
  );
}

export default App;
