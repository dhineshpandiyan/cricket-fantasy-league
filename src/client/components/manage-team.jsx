import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Actions from '../actions';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';
import './manage-team.css';

const MAX_PLAYER_SELECTION = 11;

export default class ManageTeam extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this._isDataLoaded = false;
    this._handleMatchSelection = this._handleMatchSelection.bind(this);
    this._handleSaveButtonClick = this._handleSaveButtonClick.bind(this);
    this._onPlayerSelection = this._onPlayerSelection.bind(this);
  }

  componentWillMount() {
    Actions.manageTeamAction.getMatches();
  }

  _handleMatchSelection(event) {
    const matchId = event.target && event.target.value;

    if (matchId) {
      const { matches = [] } = this.props.team || {};
      const currentMatch = matches.find(m => m._id === matchId);

      if (moment(currentMatch.startsAt).valueOf() <= moment().valueOf()) {
        return Actions.notificationAction.warning('You are not allowed to change players after match starts');
      }
      Actions.manageTeamAction.setCurrentMatchIdForManageTeam(matchId);
      Actions.manageTeamAction.getAllowedPlayersByMatchId(matchId);
      Actions.manageTeamAction.getMyTeamByMatchId(matchId);
    }
  }

  _onPlayerSelection(event, isSelected) {
    const playerId = event.target && event.target.value;

    if (playerId) {
      const { myTeamPlayers = {} } = this.props.team || {};
      const { players: selectedPlayers = [] } = myTeamPlayers;

      if (isSelected && selectedPlayers.length >= MAX_PLAYER_SELECTION) {
        return Actions.notificationAction.warning('Not allowed to add more than 11 players');
      }

      let updatedSelectedPlayers = Array.from(selectedPlayers);
      if (isSelected) {
        updatedSelectedPlayers.push(playerId);
      } else {
        updatedSelectedPlayers = updatedSelectedPlayers.filter(id => id !== playerId);
      }
      Actions.manageTeamAction.setTeamPlayers(updatedSelectedPlayers);
    }
  }

  _handleSaveButtonClick() {
    const { currentMatchId, myTeamPlayers: { players } } = this.props.team || {};
    const payload = { matchId: currentMatchId, players: Array.from(players) };

    Actions.manageTeamAction.saveTeam(payload, (err) => {
      if(err) {
        return Actions.notificationAction.error(`Failed to create team. Reason: ${err.message}`);
      }
      Actions.notificationAction.information('Team creation success');
    });
  }

  _renderMatches(matches) {
    return matches.map(({ _id, detail, startsAt }) => {
      return (
        <MenuItem key={_id} value={_id}>{detail} on {moment(startsAt).format('LLL')}</MenuItem>
      )
    });

  }

  _renderHeaderSection(matches, currentMatchId, lastModifiedAt) {
    const lastModifiedChip = lastModifiedAt && moment(lastModifiedAt).fromNow();

    return (
      <div className="match-selection">
        <Typography variant="body1" className="match-selection-text">
          Select a match which you like to create/update team
        </Typography>
        <FormControl className="match-selector">
          <InputLabel>Select Match</InputLabel>
          <Select value={ currentMatchId } onChange={this._handleMatchSelection}>
            { this._renderMatches(matches) }
          </Select>
        </FormControl>
        { lastModifiedChip ? (<Chip color="primary" variant="outlined" label={ `Last Modified At: ${lastModifiedChip}` } className="last-modified-by" />) : null }
      </div>
    );
  }

  _renderPlayers(allowedPlayers, selectedPlayers) {
    return (
      <Grid container spacing={ 2 }>
        { allowedPlayers.map(player => (
          <Grid key={player._id} item xs={3}>
            <Paper className="">
              <ListItem>
                <ListItemAvatar>
                  <Switch checked={selectedPlayers.has(player._id) } value={ player._id } color="primary" onChange={ this._onPlayerSelection }/>
                </ListItemAvatar>
                <ListItemText primary={ player.name } secondary={ player.specializedIn.join() }/>
              </ListItem>
            </Paper>
          </Grid>
        )) }
      </Grid>
    );
  }

  _renderActionButtons(allowedPlayers) {
    if(allowedPlayers.length) {
      return (
        <div className="action-buttons">
          <Button variant="contained" color="primary" className="save-button" onClick={ this._handleSaveButtonClick }>
            Build My Team
          </Button>
        </div>
      );
    }
    return null;
  }

  render() {
    const { matches = [], allowedPlayers = [], myTeamPlayers = {}, currentMatchId = '' } = this.props.team || {};
    const { players: selectedPlayers = [], lastModifiedAt } = myTeamPlayers;
    const selectedPlayersSet = new Set(selectedPlayers);

    return (
      <div className="manage-teams">
        { this._renderHeaderSection(matches, currentMatchId, lastModifiedAt) }
        { this._renderPlayers(allowedPlayers, selectedPlayersSet) }
        { this._renderActionButtons(allowedPlayers) }
      </div>
    );
  }

}

ManageTeam.propTypes = {
  team: PropTypes.shape({
    matches: PropTypes.array,
    allowedPlayers: PropTypes.array,
    myTeamPlayers: PropTypes.object,
    currentMatchId: PropTypes.string,
    lastModifiedAt: PropTypes.number
  })
};
