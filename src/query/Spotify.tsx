import axios from 'axios'
import queryString from 'query-string';
import { environment } from './Environment' ;

export const getAccessToken = () => {

	const hash = queryString.parse(window.location.hash);
	const { access_token } = hash;

	return access_token;
}

export const getUser = async () => {

	const token = getAccessToken();

	const user = await axios.get(environment.serverUrl + '/user',
		{
			params: {
				token
			}
		})
		.then(function (response) {

			return response.data.user;
		});

	return user;
}