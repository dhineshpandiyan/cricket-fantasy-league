import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Matches from './matches';
import ManageTeam from './manage-team';
import Results from './results';
import './contents.css';

export default class Contents extends Component {
  constructor(props) {
    super(props);

    this._handleTabChange = this._handleTabChange.bind(this);

    this.state = {
      currentTab: 0
    }
  }

  _handleTabChange(event, currentTab) {
    this.setState({currentTab});
  }

  render() {
    const { matches = [], team= {}, winners = {} } = this.props.data || {};
    const { currentTab } = this.state;

    return (
      <div className="contents">
        <Paper  square>
          <Tabs value={currentTab} indicatorColor="primary" textColor="primary" onChange={this._handleTabChange}>
            <Tab label="All Matches"/>
            <Tab label="Manage Team"/>
            <Tab label="Winners"/>
          </Tabs>
        </Paper>
        <Paper  square>
          {currentTab === 0 && <Matches matches={matches}/>}
          {currentTab === 1 && <ManageTeam team={team} />}
          {currentTab === 2 && <Results winners={winners} />}
        </Paper>
      </div>
    );
  }

}


Contents.propTypes = {
  data: PropTypes.object
};

