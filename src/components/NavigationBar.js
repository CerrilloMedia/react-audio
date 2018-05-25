import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
    textAlign: 'left',
  },
  bar: {
    backgroundColor: 'rgb(102, 50, 92)'
  },
  titleLink: {
    textDecoration: 'none'
  },
  button: {
    color: 'rgb(72, 179, 218)'
  }

};

function NavigationBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
      <Toolbar style={styles.bar}>
        <Typography variant="title" color="inherit" style={styles.flex}>
          <Link to="/" style={styles.titleLink}>
            <img src="assets/images/bloc_jams_logo_01.png" alt="Bloc-Jams"/>
          </Link>
        </Typography>
        <Link to='/library' style={styles.titleLink}>
          <Button style={styles.button}  >Library</Button>
        </Link>
      </Toolbar>
      </AppBar>
    </div>
  );
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationBar);
