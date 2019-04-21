import React from 'react';
import PropTypes from 'prop-types';

import './css/Thumbnail.scss';

// const jsmediatags = window.require('jsmediatags');

const {jsmediatags} = window;

class Thumbnail extends React.Component {
	static propTypes = {
		file: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			thumbnailImage: false
		};

		this._renderThumbnailPic = this._renderThumbnailPic.bind(this);
	}

	componentDidMount() {
		const { file } = this.props;

		if (!file.title) return;

		jsmediatags.read(file.title, {
			onSuccess: tag => {
				let dataUrlImage = false;

				if (tag.tags.picture) {
					let base64String = '';

					tag.tags.picture.data.forEach(item => {
						base64String += String.fromCharCode(item);
					});

					dataUrlImage = `data:${tag.tags.picture.format};base64,${window.btoa(base64String)}`;
				}

				this.setState({ thumbnailImage: dataUrlImage || null });
			},
			onError: error => {
				console.log('Error getting tags thumbnail', error.type, error.info);
			}
		});
	}

	componentWillReceiveProps(props) {
		const { file } = props;

		if (!file.title) return;

		jsmediatags.read(file.title, {
			onSuccess: tag => {
				let dataUrlImage = false;

				if (tag.tags.picture) {
					let base64String = '';

					tag.tags.picture.data.forEach(item => {
						base64String += String.fromCharCode(item);
					});

					dataUrlImage = `data:${tag.tags.picture.format};base64,${window.btoa(base64String)}`;
				}

				this.setState({ thumbnailImage: dataUrlImage || null });
			},
			onError: error => {
				console.log('Error getting tags thumbnail', error.type, error.info);
			}
		});
	}

	_renderThumbnailPic() {
		const { thumbnailImage } = this.state;

		const image = thumbnailImage || false;

		if (image) {
			return <img src={image} alt="cover-pic" id="cover-pic" />;
		}
		return <i className="far fa-headphones" id="pic-null" />;
	}

	render() {
		const { file, _showSidebar } = this.props;
		const strFile = file.title || '';
		const title = strFile.substr(strFile.lastIndexOf('\\') + 1, strFile.length);

		return (
			<div className="thumbnail-container">
				<div className="header-container">
					<div id="show-sidebar" onClick={_showSidebar}>
						<i className="fas fa-bars" />
					</div>
					<div className="title-container">
						<span id="title">{title}</span>
					</div>
				</div>
				{this._renderThumbnailPic()}
			</div>
		);
	}
}

export default Thumbnail;
