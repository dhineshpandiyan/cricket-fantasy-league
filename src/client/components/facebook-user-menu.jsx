import PropTypes from 'prop-types';
import React, { Component } from 'react'
import IconButton from "@material-ui/core/IconButton";
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class FacebookUserMenu extends Component {

  constructor(props) {
    super(props);

    this._handleMenuClick = this._handleMenuClick.bind(this);
    this._handleMenuClose = this._handleMenuClose.bind(this);
    this._handleLogoutClick = this._handleLogoutClick.bind(this);

    this.state = {
      isMenuOpen: false,
      menuTarget: null
    }
  }

  _handleMenuClick(event) {
    this.setState({
      isMenuOpen: true,
      menuTarget: event.target
    });
  }

  _handleMenuClose() {
    this.setState({
      isMenuOpen: false,
      menuTarget: null
    });
  }

  _handleLogoutClick() {
    this._handleMenuClose();
  }

  render() {
    return (
      <div>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={this._handleMenuClick}>
          <Avatar alt={this.props.name} src={this.props.picture.url} />
        </IconButton>
        <Menu id="simple-menu" anchorEl={this.state.menuTarget} keepMounted open={this.state.isMenuOpen} onClose={this._handleMenuClose} >
          <MenuItem onClick={this._handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
}

FacebookUserMenu.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
};





