import React, { Component } from 'react'
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Button from '@material-ui/core/Button';
import FacebookUserMenu from './facebook-user-menu';

import Actions from '../actions';

export default class FacebookLogin extends Component {

  constructor(props) {
    super(props);

    this._updateSSOResponse = this._updateSSOResponse.bind(this);
    this.state = {
      name: '',
      email: '',
      token: '',
      userID: '',
      picture: ''
    };
  }

  _setCookie(payload) {
    document.cookie = Object.keys(payload).map((key) => `${key}=${payload[key]};`).join('');
  }

  _updateSSOResponse(response) {
    const { name, email, userID, picture, accessToken } = response;

    this.setState({ name, email, userID, picture: response.picture.data });
    this._setCookie({ token: accessToken, userID });
    Actions.loginAction.setLoginInfo({ name, email, userID, token: accessToken });
  }

  render() {
    if (this.state.userID) {
      return (
        <FacebookUserMenu name={this.state.name} picture={ this.state.picture} />
      );
    }
    return (
      <ReactFacebookLogin
        appId="2248168885445432"
        autoLoad={true}
        fields="name,email,picture"
        callback={this._updateSSOResponse}
        render={renderProps => (<Button color="inherit" align="right" onClick={renderProps.onClick}>Login</Button>)}/>
    )
  }
}
