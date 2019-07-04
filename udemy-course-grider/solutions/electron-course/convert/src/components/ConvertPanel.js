import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import * as actions from '../actions';

class ConvertPanel extends Component {

  onCancelPressed = () => {
    this.props.removeAllVideos();
    this.props.history.push('/')
  }

  convertVideos = () => {
    this.props.convertVideos(this.props.videos);
  }

  render() {
    return (
      <div className="convert-panel">
        <button className="btn red" onClick={this.onCancelPressed}>
          Cancel
        </button>
        <button className="btn" onClick={this.convertVideos}>
          Convert!
        </button>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    videos: Object.values(state.videos)
  }
}

export default withRouter(
  connect(mapStateToProps, actions)(ConvertPanel)
);
