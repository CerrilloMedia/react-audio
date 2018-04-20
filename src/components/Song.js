import React, { Component } from 'react';

class Song extends Component {

  render() {
    return(
      <tr>
        <td className="song-index">
          {this.props.index+1}
        </td>
        <td className="song-title">{this.props.song.title}</td>
        <td className="song-duration">{this.props.song.duration}</td>
      </tr>
    )
  }

}

export default Song;
