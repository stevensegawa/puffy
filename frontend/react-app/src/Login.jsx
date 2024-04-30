import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import './Login.css';
import puffyImage from './puffy.JPG';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (username && password) {
      try {
        // Perform the API call to the login endpoint
        const response = await axios.post('http://localhost:3001/login', {
          username,
          password
        });
        localStorage.setItem('token', response.data.token); // Store the received token
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        navigate('/puffychat'); // Navigate to a protected route upon successful login
      } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : "Server error");
        alert('Login failed: Invalid username or password');
      }
    } else {
      alert('Please fill out both fields.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="penguin-container">
          <img className="penguin-picture" src={puffyImage} alt="Puffy" />
          <h2>hello! my name is puffy :)</h2>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="username">login username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="username" placeholder="Enter your username" />
          
          <label htmlFor="password">password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Enter your password" />
          
          <button type="submit" className="login-button">login</button>
        </form>
        <div className="login-footer">
          <a href="/signup">new to puffy? create an account</a>
          {/* <a href="/about">about puffy</a> */}
        </div>
      </div>
    </div>
  );
};

export default Login;

{/* OLD CODE: 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Login.css'; // make sure to link your CSS file
import puffyImage from './puffy.JPG';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const handleNavigation = () => {
    if (username && password) {
      navigate('/puffychat')
    } else {
      alert('Please fill out both fields.')
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="penguin-container">
          <img className="penguin-picture" src={puffyImage} alt="Puffy" /> 
          <h2>hello! my name is puffy :)</h2>
        </div>
        <form className="login-form">
          <label htmlFor="username">login username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="username" placeholder="Enter your username" />
          
          <label htmlFor="password">password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Enter your password" />
          
          <button onClick={handleNavigation} type="submit" className="login-button">login</button>
        </form>
        <div className="login-footer">
          <a href="/signup">new to puffy? create an account</a>
          <a href="/about">about puffy</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
 */}
