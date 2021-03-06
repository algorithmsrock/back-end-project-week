const jwt = require('jsonwebtoken');
const { mysecret } = require('../../config');
const User = require('../models/userModels');

const login = (req, res) => {
	const { username, password } = req.body;
	User.findOne({ username }, (err, user) => {
		if (err || !user) {
		  res.status(403).json({ error: 'Username or password are invalid' });
			return;
		}
		if (user === null) {
		  res.status(422).json({ error: 'Username does not match any found' });
			return;
	 }
	 user.checkPassword(password, (noPasswordMatch, hashMatch) => {
			 if (noPasswordMatch !== null) {
			   res.status(422).json({ error: 'Password entered does not match' });
				 return;
				}
       if (hashMatch) {
         const payload = {
				   username: user.username
				};
				const token = jwt.sign(payload, mysecret);
				  res.json({ token });
			 }
			});
	  });
	};

module.exports = {
	login
};

