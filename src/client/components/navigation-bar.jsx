import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FaceBookLogin from './facebook-login'

import './navigation-bar.css';

export default class NavigationBar extends Component {

  render() {
    return (
      <div className="root">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flex: 2 }}>
              AAA Sports - Fantasy League
            </Typography>
            <span className="toolbarButtons">
              <FaceBookLogin />
            </span>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}


