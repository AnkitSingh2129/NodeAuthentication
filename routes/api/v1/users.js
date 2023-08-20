const express = require('express');
const passport = require('passport');

const router = express.Router();
const usersApi = require('../../../controllers/api/v1/users_api');


router.post('/create-session', passport.authenticate('jwt', {session: false}) ,usersApi.createSession);

module.exports = router;