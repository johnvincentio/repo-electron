import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { appTheme } from './themes/themes';

import App from './components/App';

import { register } from './serviceWorker';

import configureStore from './store/configureStore';

const store = configureStore();

// console.log(`NODE_ENV ${process.env.NODE_ENV}`);

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<MuiThemeProvider theme={appTheme}>
			<CssBaseline />
			<Provider store={store}>
				<App />
			</Provider>
		</MuiThemeProvider>,
		document.getElementById('root')
	);
});

register();
