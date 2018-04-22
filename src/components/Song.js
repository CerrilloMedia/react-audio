import React, { Component } from 'react';

class Song extends Component {

  render() {
    return(
      <tr className="song" key={this.props.index} >
        <td className="song-actions" onClick={ () => this.props.handleSongClick() }>
          <button>
            <span className="song-number">{this.props.index+1}</span>
            <span className="ion-play"></span>
            <span className="ion-pause"></span>
          </button>
        </td>
        <td className="song-title">{this.props.song.title}</td>
        <td className="song-duration">{this.props.song.duration}</td>
      </tr>
    )
  }

}

export default Song;
