import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';

class Routes extends React.Component {

    render() {

       	return (
			<BrowserRouter>
				<Switch>
					<Route path='/'>
						<App />
					</Route>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Routes;
