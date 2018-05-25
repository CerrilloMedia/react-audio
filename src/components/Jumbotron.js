import React from 'react';
import Grid from 'material-ui/Grid';
import Card, { CardMedia, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const componentStyles = {
  jumbotron: {
    height: '500px',
    display: 'flex'
  },
  jumbotronh1: {
    color: 'rgb(238, 238, 238)',
    fontSize: '6em',
    textShadow: '0px 4px 11px #2f1b2e'
  },
  imageCredit: {
    lineHeight: '2em',
    marginTop: '-2em',
    textAlign: 'right',
    marginRight: '.4em',
    opacity: '.6'
  },
  cardMedia: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4vh'
  }
};

function Jumbotron(props) {

  return(
    <Grid container spacing={0}>

      <Grid item xs={12}>
        <Card style={componentStyles.jumbotron} >

          <CardMedia style={componentStyles.cardMedia}
            title={props.title}
            image={props.imageSrc}
            component="div"
            >
            <CardContent>
              <Typography variant="display1" style={componentStyles.jumbotronh1} >
                {props.heading}
              </Typography>
              <CardContent>
                {props.button}
              </CardContent>
            </CardContent>
          </CardMedia>
        </Card>
        <div style={componentStyles.imageCredit}>
          {props.imageCredit}
        </div>
      </Grid>

    </Grid>
  )
}

export default Jumbotron;
