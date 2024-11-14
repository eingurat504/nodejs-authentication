# Node.js Authentication with Passport.js

A simple authentication application built with Node.js and Passport.js. This repository demonstrates how to implement local authentication, including user registration and login functionality.

## Features

- User registration and login
- Secure password storage using bcrypt
- Local authentication with Passport.js
- Session management with express-session
- Basic UI for authentication forms (login and registration)

## Technologies Used

- Node.js
- Express.js
- Passport.js
- bcrypt for password hashing
- express-session for session management

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20.18.0 or later)
- [npm](https://www.npmjs.com/get-npm)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nodejs-authentication.git
   cd nodejs-authentication

2. Install Dependencies:

    npm install


3. Create a .env file in the root directory to store environment variables:

    PORT=5000
    SESSION_SECRET=
    DEV_DB_USERNAME=
    DEV_DB_PASSWORD=
    DEV_DB_NAME=
    DEV_DB_HOST=127.0.0.1

4. Set up the database (using MYSQL).
    
    Usage

    1. Start the server:

    ```bash
    node server.js

    2. Open your browser and go to http://localhost:5000 to access the application.

    Folder Structure
      
    nodejs-authentication/
    │
    ├── views/               # EJS or HTML views for registration and login forms
    ├── routes/              # Routes for handling authentication and user routes
    │   ├── auth.js          # Authentication routes (login, register, logout)
    ├── models/              # User model for database interaction
    │   └── User.js          # User schema and model setup
    ├── config/
    │   └── passport.js      # Passport.js configuration for authentication
    ├── .env                 # Environment variables
    ├── server.js              # Application entry point
    └── package.json         # Project metadata and dependencies


### Authentication Flow
Registration: Users can register with a username and password. Passwords are hashed using bcrypt for secure storage.
Login: Users log in with their credentials, and Passport.js validates the user information.
Session Management: Sessions are managed using express-session, allowing users to remain logged in during their session.