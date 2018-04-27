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
      duration: album.songs[0].duration,
      currentTime: 0,
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;


    this.findSongIndex = (songs) => {
      return songs.findIndex(song => song === this.state.currentSong);
    }

  }
    // for separate timer functionality such as changes in current time of track we need to mount the components
    componentDidMount() {
      this.eventListeners = {
        timeupdate: e => { this.setState({ currentTime: this.audioElement.currentTime }) },
        durationchange: e => { this.setState({ duration: this.audioElement.duration })}
      };

      this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.addEventListener('durationchange', this.eventListeners.duration);
    }

    componentWillUnmount() {
      this.audioElement.src = null;
      this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    };


    play(song) {
      this.audioElement.play();
      this.setState({
        isPlaying: true,
        track: this.findSongIndex(this.state.album.songs)
      });

    }

    pause() {
      this.audioElement.pause();
      this.setState({ isPlaying: false });
    }

    setSong(song) {
      this.audioElement.src = song.audioSrc;
      this.setState({ currentSong: song });
    }

    handleSongClick(song) {

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

    handlePrevClick() {

      const currentIndex = this.findSongIndex(this.state.album.songs);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];

      if (newSong !== this.state.currentSong) {
        this.setSong(newSong);
        this.play(newSong);
      }
    }

    handleNextClick() {

      const currentIndex = this.findSongIndex(this.state.album.songs);
      const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
      const newSong = this.state.album.songs[newIndex];

      // if disable song restart if currentSong == newSong
      if (newSong !== this.state.currentSong) {
        this.setSong(newSong);
        this.play(newSong);
      }
    }

    // Handle music slider
    handleTimeChange(e) {
      // calculate percentage of duration since the value is between 0 and 1
      const newTime =  this.audioElement.duration * e.target.value;
      // the 1st part is so the audio element updates accordingly on the audio element
      // the 2nd part is to update the Album component state and with the change in state the child (PlayerBar)
      // will update it's view through it's props
      this.audioElement.currentTime = newTime;
      this.setState({ currentTime: newTime })
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
          duration={this.audioElement.duration}
          currentTime={this.audioElement.currentTime}

          handleSongClick={ () => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={ () => this.handlePrevClick()}
          handleNextClick={ () => this.handleNextClick()}
          handleTimeChange={ (e) => this.handleTimeChange(e)}
        />
      </section>
    );
  }
}

export default Album;
