import React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import Player from './containers/Player';
import Thumbnail from './containers/Thumbnail';
import Sidebar from './containers/Sidebar';
import Add from './components/Add';

import './css/App.css';

const { ipcRenderer } = window.require('electron');

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            file: {},
            indexPlayed: 0,
            displaySidebar: null
        }

        this._showSidebar = this._showSidebar.bind(this);
        this._hideSidebar = this._hideSidebar.bind(this);
        this._changeSong = this._changeSong.bind(this);
        this._prevSong = this._prevSong.bind(this);
        this._nextSong = this._nextSong.bind(this);
        this._changeIndexWhenEnded = this._changeIndexWhenEnded.bind(this);
    }
    
    _showSidebar() {
        this.setState({displaySidebar: true});
    }

    _hideSidebar() {
        this.setState({displaySidebar: false});
    }

    _openFile() {
        ipcRenderer.send('open-file');
    }

    _openFolder() {
        ipcRenderer.send('open-folder');
    }

    _prevSong() {
        let { 
            indexPlayed, 
            files 
        } = this.state;

        if(indexPlayed <= 0) return;
        
        this.setState({
            file: files[indexPlayed - 1], 
            indexPlayed: indexPlayed - 1
        });
    }

    _nextSong() {
        let { 
            indexPlayed, 
            files 
        } = this.state;

        if(indexPlayed >= files.length - 1) return;
        
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
        let { indexPlayed } = this.state;

        this.setState({
            indexPlayed: indexPlayed+1, 
            file: this.state.files[indexPlayed+1]
        });
    }

    componentDidMount() {
        let files = [ ...this.state.files ];
        
        ipcRenderer.on('opened-file', (event, arg) => {
            let checkIfNotAvailable = files.every(item => item.title !== arg.file.title);
            
            if(checkIfNotAvailable) {
                files.push(arg.file);
                
                this.setState({files}, () => {
                    this.setState({
                        file: files[files.length - 1], 
                        indexPlayed: files.length - 1
                    });
                });
            } else {
                let songIndex = files.findIndex(item => item.title === arg.file.title);

                this.setState({
                    file: files[songIndex], 
                    indexPlayed: songIndex
                });
            }
        });

        ipcRenderer.on('opened-folder', (event, arg) => {
            files = arg.list;
            
            this.setState({files, indexPlayed: -1}, () => {
                this.setState({
                    file: files[0], 
                    indexPlayed: 0
                });
            });
        });
    }

    render() {
        return (
            <div className='App'>
                <Sidebar 
                    addFolder={this._openFolder}
                    addFile={this._openFile} 
                    indexPlayed={this.state.indexPlayed} 
                    files={ this.state.files }
                    changeSong={this._changeSong}
                    displaySidebar={this.state.displaySidebar}
                    _hideSidebar={this._hideSidebar} 
                />
                <Thumbnail 
                    file={ this.state.file } 
                    _showSidebar = {this._showSidebar}
                />
                <Player 
                    file={this.state.file} 
                    indexPlayed={this.state.indexPlayed} 
                    files={ this.state.files }
                    _changeIndexWhenEnded = { this._changeIndexWhenEnded }
                    _nextSong = { this._nextSong } 
                    _prevSong = { this._prevSong }
                />
            </div>
        );
    }
}

export default App;