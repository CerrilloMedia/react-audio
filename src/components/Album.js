import React, { Component } from 'react';
import albumData from './../data/albums';
import Song from './Song';
import PlayerBar from './PlayerBar';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const style = {
  paper: {
    background: 'none'
  },
  cardContent: {
    color: 'white'
  }
};

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
    this.audioElement.volume = .5;

    this.findSongIndex = (songs) => {
      return songs.findIndex(song => song === this.state.currentSong);
    }

  };

    // for separate timer functionality such as changes in current time of track we need to mount the components
    componentDidMount() {
      this.props.albumPage(this.props.match.path);
      this.eventListeners = {
        timeupdate:     e => { this.setState({ currentTime: this.audioElement.currentTime }) },
        durationchange: e => { this.setState({ duration: this.audioElement.duration })},
        volumechange:   e => { this.setState({ volume: this.audioElement.volume })}
      };

      this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.addEventListener('durationchange', this.eventListeners.duration);
      this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
    }

    componentWillUnmount() {
      this.props.albumPage(null);
      this.audioElement.src = null;
      this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
      this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
    };


    play(song) {
      this.audioElement.play();
      this.setState({
        isPlaying: true
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

    // Handle volume slider
    handleVolumeChange(e) {
      const newVolume = e.target.value;
      this.audioElement.volume = newVolume;
      this.setState({volume: newVolume});
    }

    // Format time string
    formatTime(timestring) {

      if ( (timestring + "").match(/[a-z]/)) {
        return "-:--";
      }

      const sec = Number(timestring);
      const date = new Date(0,0,0,0,0,sec);

      var timeArray = (date + "").match(/\d+:\d+:\d+/)[0].split(":");

      timeArray[0] = timeArray[0] > 0 ? (timeArray[0]) : null;            // hour
      timeArray[1] = timeArray[0] > 0 ? timeArray[1] : Number(timeArray[1])+""; // minutes

      return timeArray.filter(Boolean).join(":");
    };

    // this.props.albumPage(true);

  render() {
    return (
      <section className="album">
        <section id="album-info">
        <Paper style={style.paper} elevation={6}>
          <img id="album-cover-art" src={this.state.album.albumCover} alt="test" />
          <CardContent style={style.cardContent} className="album-details">
            <Typography variant="title" color='inherit'>{this.state.album.title}</Typography>
            <Typography variant="subheading" color="inherit">
              {this.state.album.artist}
            </Typography>
            <Typography variant="body1" color="inherit">
              {this.state.album.releaseInfo}
            </Typography>
          </CardContent>
          </Paper>
        </section>
        <section className="track-data">
          <Paper style={style.paper} elevation={3}>
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
                  formatTime={this.formatTime}
                  key={index} />
                )
              }
            </tbody>
          </table>
          </Paper>
        </section>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          duration={this.audioElement.duration}
          currentTime={this.audioElement.currentTime}
          volume={this.state.volume}

          formatTime={this.formatTime}
          handleSongClick={ () => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={ () => this.handlePrevClick()}
          handleNextClick={ () => this.handleNextClick()}
          handleTimeChange={ (e) => this.handleTimeChange(e)}
          handleVolumeChange={ (e) => this.handleVolumeChange(e)}
        />
      </section>
    );
  }
}

export default Album;
