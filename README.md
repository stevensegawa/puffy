**Motivation and Creation Behind Puffy**
- According to a Gallup Poll, nearly a quarter of the world feels lonely.
- Puffy is a text-based chatbot that talks with the user about their day with the aim of cheering the user up.
- Users must create an account and login with a username and password to chat with Puffy.

**Accomplishments**
- Architected and implemented secure user authentication and authorization mechanisms using JSON Web Tokens (JWT) and bcrypt, ensuring robust data protection and user privacy.
- Leveraged React Router for client-side routing and navigation, enhancing the application's usability and providing a seamless browsing experience for users.
- Integrated Axios for making asynchronous HTTP requests to the server, optimizing network communication and ensuring responsive and dynamic user interactions.

**Roadblocks and Solutions**
- Getting my backend to send data to MongoDB Atlas --> fixed conditionals of the async handlers to send data when only all necessary fields are completed
- Deciding between which APIs to integrate for the chatbot --> trained Google's Gemini API to respond with the behavior consistent with what was required
- Navigating between different React pages --> realized I was trying to route to different pages using React Router v5 instead of v6

**Next Steps**
- Save chat history with Puffy when you log back in to your account
- Create a gratitude journal based on summaries of chats with Puffy (already created the frontend for it)
- Change the web-based chat with Puffy to a text-based one using an SMS API
- Incorporate more pictures of Puffy!

**Tech Stack: JavaScript, MongoDB, Express, React, Node.**
