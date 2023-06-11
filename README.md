# Study Buddy

Study Buddy is an innovative collaborative learning platform designed to help students form and join study groups, exchange knowledge, and access various study resources. One of the standout features of Study Buddy is 'Sheldon AI', an intelligent system integrated within the platform that can answer various study-related questions.

This project is the result of collaborative work by a team of dedicated developers passionate about improving the learning experience.

# Features

- Create and Join Study Groups: Users can form their own study groups or join existing ones, promoting a collaborative learning environment.
- Forum Chats: Each study group has a chat forum for members to interact, discuss ideas, ask questions, and learn from each other.
- Sheldon AI: A powerful AI assistant within the chat forum, Sheldon AI can answer questions on various topics, providing immediate and accurate responses to aid students' understanding.
- Integrated Study Resources: The platform also includes useful tools like a pomodoro timer for efficient time management, a mirror for self-reflection, and Excalidraw for creating diagrams or illustrations.

# Technologies Used

- MERN Stack: The MERN (MongoDB, Express.js, React.js, Node.js) stack was used for full-stack development.
- OpenAI API: Powers Sheldon AI, enabling it to process and answer questions from users.

# Getting Started

Clone the repository to your local machine:

```
git clone https://github.com/carolrs/study-buddy.git
```
Follow the instructions in the Installation Guide to set up the environment and run the platform.

# Prerequisites
Node.js: Please ensure Node.js is installed on your machine. If not, you can download it from the official Node.js website.
MongoDB: This application uses MongoDB as the database. You need to install MongoDB on your machine. You can download it from the official MongoDB website.

# Navigate to the Project Directory
```
cd study-buddy
```
# Install Dependencies
This project uses npm (Node Package Manager) to manage dependencies. Install the dependencies by running:

```
npm install
```

# Run the Backend Server
After installing the dependencies, you can run the backend server. You need to provide the JWT_SECRET environment variable.
```
cd api
JWT_SECRET=SUPER_SECRET npm start
```

# Run the Frontend Application
To run the frontend, navigate to the frontend directory and start the application:

```
cd frontend
npm start
```
The application will now be running locally on your machine. By default, the frontend application runs on port 3000, so you can navigate to http://localhost:3000 in your browser to see the application in action.
