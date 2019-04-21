import React from 'react';
import PropTypes from 'prop-types';

import './css/Player.scss';

class Player extends React.Component {
	static propTypes = {
		file: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			isPlayed: false,
			duration: '00:00',
			currentTime: '00:00',
			timeRange: 0,
			currentTimeinSecs: 0,
			indexPlayedInPlayer: -1,
			ended: false
		};

		this._renderPlayButton = this._renderPlayButton.bind(this);
		this._renderSlider = this._renderSlider.bind(this);
		this._pauseSong = this._pauseSong.bind(this);
		this._playSong = this._playSong.bind(this);
		this._stopSong = this._stopSong.bind(this);
		this._songEnded = this._songEnded.bind(this);
		this._setSongTime = this._setSongTime.bind(this);
	}

	_pauseSong() {
		this.audio.pause();
		this.setState({ isPlayed: false });
	}

	_playSong() {
		this.audio.play();
		this.setState({ isPlayed: true });
	}

	_stopSong() {
		this.setState({ isPlayed: false }, () => {
			this.audio.load();
			this.audio.pause();
		});
	}

	_songEnded() {
		const { indexPlayed, files, _changeIndexWhenEnded } = this.props;

		if (!(indexPlayed == files.length - 1)) {
			this.setState(
				{
					currentTimeinSecs: 0,
					isPlayed: true
				},
				() => _changeIndexWhenEnded()
			);
		} else {
			this.setState({
				currentTimeinSecs: 0,
				isPlayed: false
			});
		}
	}

	_setSongTime(e) {
		this.audio.currentTime = e.target.value;
	}

	_renderPlayButton() {
		const { isPlayed } = this.state;
		const { file } = this.props;

		if (isPlayed) {
			return <i className="far fa-pause" id="play-pause-button" onClick={this._pauseSong} />;
		}
		return (
			<i
				className="far fa-play"
				id="play-pause-button"
				onClick={Object.values(file).length > 0 ? this._playSong : null}
			/>
		);
	}

	_renderSlider() {
		const { timeRange, currentTimeinSecs } = this.state;

		if (!timeRange || currentTimeinSecs === 0) {
			return <div className="slider-changer" />;
		}

		return (
			<div className="slider-control">
				<input type="range" min="0.000001" max={timeRange} value={currentTimeinSecs} onChange={this._setSongTime} />
			</div>
		);
	}

	componentWillReceiveProps(props) {
		const { files, indexPlayed, _changeIndexWhenEnded } = props;
		const { indexPlayedInPlayer } = this.state;

		if (files.length <= 0 || indexPlayed === indexPlayedInPlayer) return;
		this.audio.load();
		this.setState({ filesLength: files.length, indexPlayedInPlayer: indexPlayed, isPlayed: true });
	}

	componentDidMount() {
		this.audio.addEventListener('loadedmetadata', () => {
			const { duration } = this.audio;
			const minutes = `${Math.trunc(duration / 60)}`;
			const seconds = `${Math.round(duration % 60)}`;

			const timeDuration = `${'00'.substr(minutes.length) + minutes}:${'00'.substr(seconds.length)}${seconds}`;

			this.setState({
				duration: timeDuration,
				timeRange: duration
			});
		});

		this.audio.addEventListener('ended', this._songEnded);

		this.audio.addEventListener('timeupdate', () => {
			const { currentTime } = this.audio;
			const minutes = `${Math.trunc(currentTime / 60)}`;
			const seconds = `${Math.floor(currentTime % 60)}`;

			const convertedCurrentTime = `${'00'.substr(minutes.length) + minutes}:${'00'.substr(seconds.length)}${
				seconds === '60' ? '00' : seconds
			}`;

			this.setState({
				currentTime: convertedCurrentTime,
				currentTimeinSecs: currentTime
			});
		});
	}

	render() {
		const { isPlayed, duration, currentTime, timeRange, currentTimeinSecs } = this.state;
		const { file, _prevSong, _nextSong } = this.props;
		const strFile = file.title || '';
		const title = strFile.substr(strFile.lastIndexOf('\\') + 1, strFile.length);

		return (
			<div className="Player">
				{this._renderSlider()}
				<div className="controller-container">
					<audio ref={node => (this.audio = node)} autoPlay>
						<source src={file.format} />
					</audio>
					<div className="music-detail">
						<div className="music-border">
							<i className="far fa-headphones" id="music-button" />
						</div>
						<div className="detail-container">
							<span id="real-title">{file.realTitle}</span>
							<span id="artist">{file.artist}</span>
							<span id="album">{file.album}</span>
						</div>
					</div>
					<div className="controllers">
						<i className="fas fa-backward" id="prev-button" onClick={_prevSong} />
						{this._renderPlayButton()}
						<i className="far fa-stop" id="stop-button" onClick={this._stopSong} />
						<i className="fas fa-forward" id="next-button" onClick={_nextSong} />
						<i className="fas fa-volume-down" id="volume-button" />
						<span id="duration">
							{currentTime} / {duration}
						</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Player;
