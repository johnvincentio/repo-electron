//

import React from 'react';
// import PropTypes from 'prop-types';

import './css/Sidebar.scss';
import Add from '../components/Add';
import MusicItem from '../components/MusicItem';

class Sidebar extends React.Component {
	static propTypes = {};

	constructor(props) {
		super(props);

		this._renderList = this._renderList.bind(this);
	}

	_renderList() {
		const { files, indexPlayed, changeSong } = this.props;

		if (files.length <= 0) {
			return <i className="fas fa-file" id="icon-files" />;
		}

		return (
			<div className="music-list">
				{files.map((item, index) => {
					return <MusicItem key={index} item={item} indexPlayed={indexPlayed} index={index} changeSong={changeSong} />;
				})}
			</div>
		);
	}

	render() {
		return (
			<div
				className="Sidebar"
				id={this.props.displaySidebar ? 'displayed' : this.props.displaySidebar === null ? '' : 'hidden'}
			>
				<div className="header">
					{/* <Add addFunc={this.props.addFile} /> */}
					<Add buttonClass="add-folder" addFunc={this.props.addFolder} />
					<div id="close-sidebar" onClick={this.props._hideSidebar}>
						<i className="fas fa-times" />
					</div>
				</div>
				<div className="content">{this._renderList()}</div>
			</div>
		);
	}
}

export default Sidebar;
