# Node.js Authentication System

This project provides a boilerplate for setting up a secure authentication system using Node.js, Express.js, and Passport.js. It supports local authentication as well as third-party authentication via Google OAuth2 and Facebook OAuth2.

## Installation

1. Clone the repository.
2. Install the dependencies.
    npm install

3. Create a `.env` file and add your database connection string and secret key.
   DATABASE_URL=mongodb://localhost:27017/node-auth
   SESSION_SECRET_KEY=secret-key


4. Start the server.
   npm start



## Usage

1. Create a user account by visiting `/signup`.
2. Log in using your credentials at `/login`.
3. Access protected pages such as `/profile` and `/dashboard` after logging in.

## Features

- Local authentication
- Google OAuth2 authentication
- Facebook OAuth2 authentication
- Express.js
- Passport.js
- Mongoose
- EJS
- Bootstrap

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.


## Live Demo

Check out the live demo of this authentication system [here](https://nodeauthentication-8uro.onrender.com/users/sign-in).
