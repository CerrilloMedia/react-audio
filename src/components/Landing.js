import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, {CardContent }  from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import Jumbotron from './Jumbotron';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

const componentStyles = {
  root: {
    flexGrow: 1,
    fontSize: '60px'
  },
  card: {
    background: 'none',
    boxShadow: 'none'
  },
  cardContent: {
    padding: '12px'
  },
  icon: {
    fontSize: '44px',
    fontWeight: 400,
    padding: '.7em'
  },
  jumbotronButton: {
    backgroundColor: '#3787a3',
    color: 'white',
    '&:hover': {
      color: 'pink !important'
    }
  }
};

// function Landing(props) {

class Landing extends Component {

componentDidMount() {
  this.props.toggleResizeEvent();
}

render() {
  return(
    <div className={componentStyles.root}>
    <Jumbotron
      title={'Turn the music up!'}
      imageSrc={'/assets/images/blurred_backgrounds/blur_bg_3_mix_01.jpg' }
      heading={"Turn the music up!"}
      imageCredit={"Photo by Mr Cup / Fabien Barral on Unsplash"}
    />

    <Grid container spacing={0} className="selling-points">

      <Grid item xs={12} sm={4} className="selling-points">
          <CardContent className="point" style={componentStyles.cardContent}>
            <Card style={componentStyles.card}>
              <CardContent>
                <CardContent>
                  <Typography variant="display1" component="h2">
                    Choose your music
                  </Typography>
                  </CardContent>
                <p className="point-description">The world is full of music; why should you have to listen to music curated by someone else?</p>
                <Icon style={componentStyles.icon}>playlist_add</Icon>
              </CardContent>
            </Card>
          </CardContent>
      </Grid>

      <Grid item xs={12} sm={4} className="selling-points">
          <CardContent className="point" style={componentStyles.cardContent}>
            <Card style={componentStyles.card}>
              <CardContent>
                <CardContent>
                  <Typography variant="display1" component="h2">
                    Unlimited streaming, ad-free
                  </Typography>
                </CardContent>
                <p className="point-description">No arbitrary limits. No disctractions</p>
                <Icon style={componentStyles.icon}>cloud</Icon>
                </CardContent>
              </Card>
            </CardContent>
      </Grid>

      <Grid item xs={12} sm={4} className="selling-points">
          <CardContent className="point" style={componentStyles.cardContent}>
            <Card style={componentStyles.card}>
              <CardContent>
                <CardContent>
                  <Typography variant="display1" component="h2">
                    Mobile enabled
                  </Typography>
                </CardContent>
                <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
                <Icon style={componentStyles.icon}>mobile_friendly</Icon>
              </CardContent>
            </Card>
          </CardContent>
      </Grid>

    </Grid>

    <Jumbotron
      title={'Turn the music up!'}
      imageSrc={'/assets/images/bloc_jams_headphones_bg.jpg' }
      heading={"It's time to get jamming!"}
      imageCredit={"Photo by Bloc"}
      button={
        <Button variant="raised" style={componentStyles.jumbotronButton}>
          Join Now!
        </Button>
      }
    />

    </div>
    )
  };
};

export default withStyles(styles)(Landing);
