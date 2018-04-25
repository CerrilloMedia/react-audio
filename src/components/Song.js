import React, { Component } from 'react';

class Song extends Component {
  constructor(props) {
    super(props);
    this.status = null;
  }

  render() {

    if (this.props.currentSong !== this.props.song) {
      this.status = <span className="song-number">{this.props.index+1}</span>
    } else {
      
      this.status = this.props.isPlaying ? <span className="ion-pause"></span> : <span className="ion-play"></span>
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
