import React, { Component } from 'react';

class Song extends Component {

  status() {
    if (this.props.currentSong !== this.props.song ) {
      return <span className="song-number">{this.props.index+1}</span>
    } else {
      return this.props.isPlaying ? <span className="ion-pause"></span> : <span className="ion-play"></span>
    }
  }


  render() {

    return(
      <tr className="song" data-id={this.props.index}>
        <td className="song-actions" >
          <button onClick={ () => this.props.handleSongClick()} >
          {
            this.status()
          }
          </button>
        </td>
        <td className="song-title">{this.props.song.title}</td>
        <td className="song-duration">{this.props.formatTime(this.props.song.duration)}</td>
      </tr>
    )
  }

}

export default Song;
