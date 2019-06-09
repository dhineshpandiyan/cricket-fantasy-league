import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Actions from '../actions';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import moment from 'moment';

import './results.css';

export default class Results extends Component {
  constructor(props) {
    super(props);

    this._handleMatchSelection = this._handleMatchSelection.bind(this);
  }

  componentWillMount() {
    Actions.winnerAction.getMatches();
  }

  _handleMatchSelection(event) {
    const matchId = event.target && event.target.value;

    if (matchId) {
      Actions.winnerAction.setCurrentMatchId(matchId);
      Actions.winnerAction.getResultsByMatchId(matchId);
    }
  }

  _renderMatches(matches) {
    return matches.map(({ _id, detail, startsAt }) => {
      return (
        <MenuItem key={_id} value={_id}>{detail} on {moment(startsAt).format('LLL')}</MenuItem>
      )
    });

  }

  _renderMatchSelection(matches, currentMatchId) {
    return (
      <div className="match-selection">
        <Typography variant="body1" className="match-selection-text">
          Select a match which you like to view score
        </Typography>
        <FormControl className="match-selector">
          <InputLabel>Select Match</InputLabel>
          <Select value={ currentMatchId } onChange={this._handleMatchSelection}>
            { this._renderMatches(matches) }
          </Select>
        </FormControl>
      </div>
    );
  }

  _renderResultTable(results) {
    if (results.length) {
      return (
        <Paper square>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map(entry => (
                <TableRow key={entry.userId}>
                  <TableCell component="th" scope="row">
                    {entry.name}
                  </TableCell>
                  <TableCell align="right">{entry.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    }
    return null;
  }

  render() {
    const { matches = [], currentMatchId = '', results = [] } = this.props && this.props.winners || {};

    return (
      <div className="results">
        { this._renderMatchSelection(matches, currentMatchId) }
        { results && this._renderResultTable(results) }
      </div>
    );
  }

}

Results.propTypes = {
  winners: PropTypes.shape({
    matches: PropTypes.array,
    results: PropTypes.array,
    currentMatchId: PropTypes.string
  })
};
