# HD Notes - Full-Stack Note-Taking Application

A complete full-stack note-taking application built with a modern technology stack. It features a secure user authentication system using email and OTP, and allows users to create and manage their notes.

### Live URLs
* **Frontend (Vercel)**: [https://note-taking-app-chi-ten.vercel.app/](https://note-taking-app-chi-ten.vercel.app/)
* **Backend (Render)**: [https://note-app-server.onrender.com](https://note-app-server.onrender.com)

## Features
* **User Authentication**: Secure sign-up and sign-in flow using email and One-Time Passwords (OTP).
* **JWT Authorization**: User actions are protected using JSON Web Tokens.
* **Note Management**: Logged-in users can create, view, and delete their personal notes.
* **Responsive Design**: A mobile-first UI that provides a seamless experience on both desktop and mobile devices.
* **Email Integration**: Sends OTPs to the user's email address for verification.

## Technology Stack
* **Frontend**: ReactJS (TypeScript), Tailwind CSS, Axios, React Router
* **Backend**: Node.js, Express.js, TypeScript
* **Database**: PostgreSQL with Sequelize
* **Deployment**:
    * Frontend deployed on Vercel.
    * Backend and Database deployed on Render.

## Local Setup and Installation

### Prerequisites
* Node.js (v18 or later)
* npm
* PostgreSQL
* Git

### 1. Clone the Repository
```bash
git clone [https://github.com/SankirthKoparde/note-taking-app.git](https://github.com/SankirthKoparde/note-taking-app.git)
cd note-taking-app
```

### 2. Backend Setup
```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Set up your PostgreSQL database and user.
# Then, create a .env file in the /server directory
# and add the following variables:
```

#### `server/.env` Example
```env
PORT=5001
DB_URL=postgresql://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/notes_db
JWT_SECRET=your_jwt_secret_string
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_16_character_gmail_app_password
```

```bash
# Run the backend development server
npm run dev
```
The backend will be running at `http://localhost:5001`.

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to the client directory
cd client

# Install dependencies
npm install

# Create a .env file in the /client directory
# and add the following variable:
```

#### `client/.env` Example
```env
REACT_APP_API_URL=http://localhost:5001/api
```

```bash
# Run the frontend development server
npm start
```
The frontend will open at `http://localhost:3000`.