import React, { Component } from 'react';

class Song extends Component {
  constructor(props) {
    super(props);
    this.status = null;
  }

  render() {

    if (this.props.track !== this.props.index) {
      // if props.index doesn't match props.track or props.track is null display track number
      this.status = <span className="song-number">{this.props.index+1}</span>
    } else if (this.props.isPlaying && this.props.track === this.props.index ) {
      // if song is playing and track matches index, display the pause button
      this.status = <span className="ion-pause"></span>
    } else {
      this.status = <span className="ion-play"></span>
    }

    return(
      <tr className="song" data-id={this.props.index}>
        <td className="song-actions" >
          <button onClick={ () => this.props.handleSongClick()} >
          {
            this.status
          }
          </button>
        </td>
        <td className="song-title">{this.props.song.title}</td>
        <td className="song-duration">{this.props.song.duration}</td>
      </tr>
    )
  }

}

export default Song;
