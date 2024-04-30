import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PuffyChat.css'; // Make sure the CSS file is linked
import axios from 'axios';

// Function to send prompt and receive the response
const sendPromptToBackend = async (prompt) => {
  try {
    const response = await axios.post('http://localhost:3001/chat', { prompt });
    return response.data.message;
  } catch (error) {
    console.error('Failed to fetch response:', error);
    return "Failed to get response";
  }
}

const PuffyChat = () => {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);

  let navigate = useNavigate();
  const navigateToPage = (path) => {
    navigate(path);
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userInput.trim()) {
      setConversation([...conversation, { sender: 'user', text: userInput }]);
      const puffyResponse = await sendPromptToBackend(userInput);
      setConversation([...conversation, { sender: 'user', text: userInput }, { sender: 'puffy', text: puffyResponse }]);
      setUserInput(''); // Clear input after sending
    }

    {/*
    event.preventDefault();
    if (userInput.trim()) {
      setConversation([...conversation, { sender: 'user', text: userInput }]);
      setUserInput('');
      // Here you would also handle sending the userInput to Puffy and receiving a response
      // For example, you could call an API here and then add Puffy's response to the conversation
      const puffyResponse = "I'm glad you're here!"; // This should be replaced with a real API call
      setConversation([...conversation, { sender: 'user', text: userInput }, { sender: 'puffy', text: puffyResponse }]);
    }
    */}
  };

  return (
    <div className="puffy-chat-container">
      <div className="chat-box">
        <div className="conversation">
          {conversation.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form className="user-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleUserInput}
            placeholder="Say something to Puffy..."
            className="user-input"
          />
          <button type="submit" className="send-button">Send</button>
        </form>
        <form className="user-input-form" onSubmit={handleSubmit}>
          {/* <button className="gratitude-button" onClick={() => navigateToPage('/journal')}>Gratitude Journal</button> */}
          <button onClick={() => navigateToPage('/')}>Back</button>
        </form>
      </div>
    </div>
  );
};

export default PuffyChat;
