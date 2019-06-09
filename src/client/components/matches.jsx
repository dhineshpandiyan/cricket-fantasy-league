import PropTypes from 'prop-types';
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';

import Actions from '../actions';

export default class Matches extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    Actions.matchAction.getMatches();
  }

  renderMatches() {
    const { matches = [] } = this.props;

    return matches.map(match => {
      // ::TODO:: Use below teams variable to show country flag in UI
      const { _id, detail, teams, startsAt } = match;

      return (
        <div key={ _id }>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={ detail } secondary={ moment(startsAt).format('LLL') }/>
          </ListItem>
        </div>
      );
    })
  }

  render() {
    return (
      <div>
        <List>
          { this.renderMatches() }
        </List>

      </div>
    );
  }

}

Matches.propTypes = {
  matches: PropTypes.array
};