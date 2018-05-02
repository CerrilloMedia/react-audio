import React, { Component } from 'react';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';

const style = {
  minWidth: 0
};

class PlayerBar extends Component {

  render() {
    return(
      <section className="player-bar">
        <section id="buttons">
          <Button style={style} id="previous" onClick={this.props.handlePrevClick}>
            <Icon>skip_previous</Icon>
          </Button>
          <Button style={style} id="play-pause" onClick={this.props.handleSongClick} >
            <Icon>{ this.props.isPlaying ? "pause" : "play_arrow"}</Icon>
          </Button>
          <Button style={style} id="next" onClick={this.props.handleNextClick}>
            <Icon>skip_next</Icon>
          </Button>
        </section>
        <section id="time-controls">
          <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
          <input
            type="range"
            className="seek-bar"
            value={ (this.props.currentTime / this.props.duration) || 0 }
            min="0"
            max="1"
            step="0.01"
            onChange={this.props.handleTimeChange}
          />
          <div className="total-time">{this.props.formatTime(this.props.duration || 0)}</div>
        </section>
        <section id="volume-controls">
          <Icon>volume_mute</Icon>
          <input
            type="range"
            className="seek-bar"
            min="0"
            max="1"
            step=".01"
            value={this.props.volume || 0}
            onChange={this.props.handleVolumeChange}
          />
          <Icon>volume_up</Icon>
        </section>
      </section>
    )
  }
}

export default PlayerBar;
