
## Node.js Authentication App

This is a Node.js authentication system. It includes support for local authentication, Google OAuth2, and Facebook OAuth2.

### Installation

1. Clone the repository.
2. Install the dependencies.

```
npm install
```

3. Create a `.env` file and add your database connection string.

```
DATABASE_URL=mongodb://localhost:27017/node-auth
```

4. Start the server.

```
npm start
```

### Usage

To use the boilerplate, you will need to create a user account. You can do this by visiting the `/signup` page. Once you have created an account, you can log in by visiting the `/login` page.

After you have logged in, you will be able to access the protected routes. These routes are located at `/profile` and `/logout`.

### Features

The boilerplate includes the following features:

* Local authentication
* Google OAuth2 authentication
* Facebook OAuth2 authentication
* Express.js
* Passport.js
* Mongoose
* EJS
* Connect-flash

### Contributing

Contributions are welcome! Please feel free to fork the repository and submit a pull request.

