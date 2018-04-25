import React, { Component } from 'react';
import albumData from './../data/albums';
import Song from './Song';
import PlayerBar from './PlayerBar';

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

    const findSongIndex = (songs) => {
      return songs.findIndex(song => song === this.state.currentSong);
    }

    // not assigning audioElement from within the components state
    // This is because changes to a components state and props triggers a re-render of the DOM
    // We would like to access this element
    this.audioElement = document.createElement('audio');
    // default play begins at first track songs[0]
    this.audioElement.src = album.songs[0].audioSrc;

    this.play = (song) => {
      this.audioElement.play();
      this.setState({
        isPlaying: true,
        track: findSongIndex(this.state.album.songs)
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

    this.handleSongClick = (song) => {

      const isSameSong = this.state.currentSong === song;
      // if currentSong is clicked, pause song. Otherwise contine playback
      if (isSameSong && this.state.isPlaying) {
        this.pause();
      } else { // if song is NOT the same, set song before proceeding to play.
        if (!isSameSong) {
          this.setSong(song);
        }
        this.play(song);
        }
      }

    this.handlePrevClick = () => {

      const currentIndex = findSongIndex(this.state.album.songs);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];

      if (newSong !== this.state.currentSong) {
        this.setSong(newSong);
        this.play(newSong);
      }
    }

    this.handleNextClick = () => {

      const currentIndex = findSongIndex(this.state.album.songs);
      const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
      const newSong = this.state.album.songs[newIndex];

      // if disable song restart if currentSong == newSong
      if (newSong !== this.state.currentSong) {
        this.setSong(newSong);
        this.play(newSong);
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
                currentSong={this.state.currentSong}
                isPlaying={this.state.isPlaying}
                index={index}
                handleSongClick={ () => this.handleSongClick(song) }
                key={index} />
              )
            }
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          handleSongClick={ () => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={ () => this.handlePrevClick()}
          handleNextClick={ () => this.handleNextClick()}
        />
      </section>
    );
  }
}

export default Album;
