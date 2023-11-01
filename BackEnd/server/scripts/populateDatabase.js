const axios = require('axios');
const signupApi = 'http://localhost:3001/api/v1/user/signup';

const users = [
	{
		firstName: 'Tony',
		lastName: 'Stark',
		email: 'tony@stark.com',
		password: 'password123',
		userName: 'Iron',
	},

users.forEach(user => {
	axios
		.post(signupApi, user)
		.then(response => console.log(response))
		.catch(error => console.log(error));
});
