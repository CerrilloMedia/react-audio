import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styles = {
  card: {
    display: 'flex',
    background: '#fcfcff'
  },
  cover: {
    paddingBottom: '100%'
  },
  content: {
    textAlign: 'left'
  },
  link: {
      textDecoration: 'none'
  },
  details: {
    width: '60%'
  },
  cover_container: {
    width: '40%'
  },
  icon_play: {
    color: 'black'
  }
}

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  };

  componentDidMount() {
    this.props.toggleResizeEvent();
  }

  render() {
    return(
      <section className="library">
        <Grid container spacing={0}>
        {
          this.state.albums.map( (album, index) =>
          <Grid item xs={12} sm={6}  key={index} >
            <Card className="album-card" style={styles.card} >
              <div style={styles.details}>
              <Link to={`/album/${album.slug}`} style={styles.link}>
                <CardContent style={styles.content} className="album-card-data">
                  <Typography variant="title">{album.title}</Typography>
                  <Typography variant="subheading" gutterBottom>
                    {album.artist}
                  </Typography>
                  <Typography variant="body2">{album.songs.length} songs</Typography>
                </CardContent>
                </Link>
              </div>
              <div style={styles.cover_container}>
                <CardMedia
                className="album-cover"
                style={styles.cover}
                image={album.albumCover}
                title={album.title}
                />
              </div>
          </Card>
            </Grid>
          )
        }
        </Grid>
      </section>
    )
  }
}

export default Library;
