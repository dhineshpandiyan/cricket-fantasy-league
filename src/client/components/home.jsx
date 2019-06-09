import React, { Component } from 'react';
import NavigationBar from './navigation-bar';
import Contents from './contents';
import Notifications from './notifications';
import dataStore from '../data-store';

import './app.css';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this._dataCursor = dataStore.getDataCursor();
    this._updateState = this._updateState.bind(this);

    this.state = { data: {} };
  }

  componentDidMount() {
    this._dataCursor.on('update', this._updateState)
  }

  _updateState() {
    const data = this._dataCursor.get();

    this.setState({ data });
  }

  render() {
    const { data = {} } = this.state;
    const { token: userToken = '' } = data.loggedInUser || {};


    return (
      <div>
        <NavigationBar data={data} />
        { userToken && <Contents data={data} /> }
        <Notifications notifications={ data.notifications || [] } />
      </div>
    );
  }

}
