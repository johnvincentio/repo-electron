//

// import { ipcRenderer } from 'electron';
import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import * as actions from '../redux/actions';

// import 'font-awesome/css/font-awesome.min.css';
import Player from '../containers/Player';
import Thumbnail from '../containers/Thumbnail';
import Sidebar from '../containers/Sidebar';
import Add from './Add';

import './App.scss';

const electron = window.require('electron');

// const { ipcRenderer } = window.require('electron');
const { ipcRenderer } = window.electron;
// const { ipcMain } = window.electron;
// console.log('window.electron ', window.electron);

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			files: [],
			file: {},
			indexPlayed: 0,
			displaySidebar: null
		};

		this._showSidebar = this._showSidebar.bind(this);
		this._hideSidebar = this._hideSidebar.bind(this);
		this._changeSong = this._changeSong.bind(this);
		this._prevSong = this._prevSong.bind(this);
		this._nextSong = this._nextSong.bind(this);
		this._changeIndexWhenEnded = this._changeIndexWhenEnded.bind(this);
	}

	_showSidebar() {
		this.setState({ displaySidebar: true });
	}

	_hideSidebar() {
		this.setState({ displaySidebar: false });
	}

	_openFile() {
		console.log('App::_openFile');
		ipcRenderer.send('open-file');
	}

	_openFolder() {
		console.log('>>> App::openFolder');
		ipcRenderer.send('open-folder');
		console.log('<<< App::openFolder');
	}

	_prevSong() {
		const { indexPlayed, files } = this.state;

		if (indexPlayed <= 0) return;

		this.setState({
			file: files[indexPlayed - 1],
			indexPlayed: indexPlayed - 1
		});
	}

	_nextSong() {
		const { indexPlayed, files } = this.state;

		if (indexPlayed >= files.length - 1) return;

		this.setState({
			file: files[indexPlayed + 1],
			indexPlayed: indexPlayed + 1
		});
	}

	_changeSong(index) {
		this.setState({
			indexPlayed: index,
			file: this.state.files[index]
		});
	}

	_changeIndexWhenEnded() {
		const { indexPlayed } = this.state;

		this.setState({
			indexPlayed: indexPlayed + 1,
			file: this.state.files[indexPlayed + 1]
		});
	}

	componentDidMount() {
		console.log('App::componentDidMount; this.state ', this.state);
		let files = [...this.state.files];

		console.log('App::componentDidMount; ipcRenderer ', ipcRenderer);

		ipcRenderer.on('opened-file', (event, arg) => {
			console.log('App::componentDidMount::opened-file');
			const checkIfNotAvailable = files.every(item => item.title !== arg.file.title);

			if (checkIfNotAvailable) {
				files.push(arg.file);

				this.setState({ files }, () => {
					this.setState({
						file: files[files.length - 1],
						indexPlayed: files.length - 1
					});
				});
			} else {
				const songIndex = files.findIndex(item => item.title === arg.file.title);

				this.setState({
					file: files[songIndex],
					indexPlayed: songIndex
				});
			}
		});

		ipcRenderer.on('opened-folder', (event, arg) => {
			console.log('App::componentDidMount::opened-folder; arg ', arg);
			files = arg.list;

			this.setState({ files, indexPlayed: -1 }, () => {
				this.setState({
					file: files[0],
					indexPlayed: 0
				});
			});
		});
	}

	render() {
		return (
			<div className="App">
				<h1>Anything</h1>
				<Sidebar
					addFolder={this._openFolder}
					addFile={this._openFile}
					indexPlayed={this.state.indexPlayed}
					files={this.state.files}
					changeSong={this._changeSong}
					displaySidebar={this.state.displaySidebar}
					_hideSidebar={this._hideSidebar}
				/>
				{/* <Thumbnail file={this.state.file} _showSidebar={this._showSidebar} />
				<Player
					file={this.state.file}
					indexPlayed={this.state.indexPlayed}
					files={this.state.files}
					_changeIndexWhenEnded={this._changeIndexWhenEnded}
					_nextSong={this._nextSong}
					_prevSong={this._prevSong}
				/> */}
			</div>
		);
	}
}

export default App;

// App.propTypes = {
// 	actions: PropTypes.shape({
// 		getUserData: PropTypes.func.isRequired
// 	}).isRequired
// };

// const mapStateToProps = state => ({
// 	data: state.dataReducer.data
// });

// const mapDispatchToProps = dispatch => ({
// 	actions: bindActionCreators(actions, dispatch)
// });

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(App);
