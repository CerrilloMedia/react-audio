import React, { Component } from 'react';
import albumData from './../data/albums';
import Song from './Song';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      track: null
    };

    // not assigning audioElement from within the components state
    // This is because changes to a components state and props triggers a re-render of the DOM
    // We would like to access this element
    this.audioElement = document.createElement('audio');
    // default play begins at first track songs[0]
    this.audioElement.src = album.songs[0].audioSrc;

    this.play = (index) => {
      this.audioElement.play();
      this.setState({
        isPlaying: true,
        track: index
      });

    }

    this.pause = () => {
      this.audioElement.pause();
      this.setState({ isPlaying: false });
    }

    this.setSong = (song) => {
      this.audioElement.src = song.audioSrc;
      this.setState({ currentSong: song });
    }

    this.handleSongClick = (song,index) => {

      const isSameSong = this.state.currentSong === song;
      // if currentSong is clicked, pause song. Otherwise contine playback
      if (isSameSong && this.state.isPlaying) {
        this.pause();
      } else { // if song is NOT the same, set song before proceeding to play.
        if (!isSameSong) {
          this.setSong(song);
        }
        this.play(index);
        }
      }
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt="test" />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map( (song, index) =>
              <Song
                song={song}
                isPlaying={this.state.isPlaying}
                track={this.state.track}
                index={index}
                handleSongClick={ () => this.handleSongClick(song, index) }
                key={index} />
              )
            }
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
