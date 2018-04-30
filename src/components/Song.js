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
      <tr className={ this.props.currentSong === this.props.song && this.props.isPlaying ? "song is-playing" : "song" } data-id={this.props.index} onClick={ () => this.props.handleSongClick()} >
        <td className="song-actions" >
          <button>
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
