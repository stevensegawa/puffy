import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import './Signup.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (firstName && lastName && username && password) { // Check all fields
      try {
        // Perform signup logic here
        await axios.post('http://localhost:3001/register', {
          firstName,
          lastName,
          username,
          password
        });
        navigate('/'); // Redirect to homepage after successful signup
      } catch (error) {
        console.error('Signup failed:', error.response ? error.response.data : "Server error");
        alert('Signup failed: Please try again later');
      }
    } else {
      alert('Please fill out all fields.'); // Display error message if fields are incomplete
    }
  };

  return (
    <div className="create-account-container">
      <h2>Create an account</h2>
      <form className="create-account-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="first-name" placeholder="First Name" />
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} id="last-name" placeholder="Last Name" />
        </div>
        <div className="form-row">
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="login" placeholder="Username" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Password" />
        </div>
        <div className="form-row">
          <button type="submit" className="create-account-button">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
