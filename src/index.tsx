import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { environment } from './query/Environment'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Routes from './Routes'
import { getAccessToken } from './query/Spotify'
import './index.scss'

(async () => {

	const token = getAccessToken();

	if (!token) {

		const loginUrl = environment.serverUrl + '/login?origin=' + window.location.href;

		window.location.href = loginUrl;

		return null;
	}

	const theme = createMuiTheme({
		typography: {
			fontFamily: 'Recursive Sans Linear Static Medium'
		},
		palette: {
			type: 'dark',
			primary: {
				light: '#0bc9da',
				main: '#00b7c9',
				dark: '#02abba',
				contrastText: '#000'
			},
			secondary: {
				light: 'rgb(79, 126, 177)',
				main: 'rgb(146, 166, 188);',
				dark: 'rgb(59, 101, 145)',
				contrastText: '#FFF'
			},
			background: {
				paper: '#111',
				default: '#111'
			}
		}
	});

	const client = new ApolloClient({
		uri: environment.serverUrl + '/graphql'
	});

	render(<ApolloProvider client={ client }>
		<MuiThemeProvider theme = { theme }>
			<CssBaseline />
			<Routes />
		</MuiThemeProvider>
	</ApolloProvider>, document.getElementById('root'))

})();