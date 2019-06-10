const Baobab = require('baobab');
const axios = require('axios');

const dataTree = new Baobab({
  data: {
    matches: [],
    team: {},
    winners: {},
    notifications: [],
    loggedInUser: {}
  }
});

function getDataCursor() {
  return dataTree.select('data');
}

function _fetch(url, callback = () => {}) {
  return axios.get(url)
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
      callback(response.data.error);
    })
    .catch(err => {
      if (err.response.data && err.response.data.error) {
        callback(err.response.data.error);
      }
      callback(err.toJSON());
    });
}

function _fetchMatches() {
  return _fetch('/api/v1/sports-service/matches');
}

function _fetchPlayersByMatchId(matchId) {
  return _fetch(`/api/v1/sports-service/players?matchId=${matchId}`);
}

function _fetchMyTeamByMatchId(matchId) {
  return _fetch(`/api/v1/sports-service/team?matchId=${matchId}`);
}

function _fetchResults(matchId) {
  return _fetch(`/api/v1/sports-service/ranks?matchId=${matchId}`);
}

// For - All Matches
function getMatches() {
  _fetchMatches()
    .then(matches => {
      getDataCursor().set('matches', matches);
    });
}

// For Manage Teams
function _getTeamCursor() {
  return getDataCursor().select('team');
}

function getMatchesForManageTeams() {
  _fetchMatches()
    .then(matches => {
      _getTeamCursor().set('matches', matches);
    });
}

function getAllowedPlayersByMatchId(matchId) {
  _fetchPlayersByMatchId(matchId)
    .then(allowedPlayers => {
      _getTeamCursor().set('allowedPlayers', allowedPlayers);
    });
}

function getMyTeamByMatchId(matchId) {
  _fetchMyTeamByMatchId(matchId)
    .then(teamPlayers => {
      _getTeamCursor().set('myTeamPlayers', teamPlayers);
    });
}

function saveTeam(data, callback = () => {}) {
  return axios.post('/api/v1/sports-service/players', {data})
    .then(response => {
      if (response.status === 200) {
        return callback(null, response.data);
      }
      callback(response.data.error);
    })
    .catch(err => {
      if (err.response.data && err.response.data.error) {
        return callback(err.response.data.error);
      }
      callback(err.toJSON());
    });
}

function setCurrentMatchIdForManageTeam(matchId) {
  _getTeamCursor().set('currentMatchId', matchId);
}

function setTeamPlayers(teamPlayers) {
  _getTeamCursor().select('myTeamPlayers').set('players', teamPlayers);
}

// For Winners
function _getWinnersCursor() {
  return getDataCursor().select('winners');
}

function getMatchesForWinners() {
  _fetchMatches()
    .then(matches => {
      _getWinnersCursor().set('matches', matches);
    });
}

function getResultsByMatchId(matchId) {
  _fetchResults(matchId)
    .then(results => {
      _getWinnersCursor().set('results', results);
    });

}

function setCurrentMatchIdForWinner(matchId) {
  _getWinnersCursor().set('currentMatchId', matchId);
}

// For Notifications
function _getNotificationssCursor() {
  return getDataCursor().select('notifications');
}

function pushNotifications(message, type) {
  const notifications = _getNotificationssCursor().get();

  _getNotificationssCursor().set(notifications.concat({_id: `id-${Date.now()}`, message, type}));
}

function removeNotification(messageId) {
  const notifications = _getNotificationssCursor().get();

  _getNotificationssCursor().set(notifications.filter(notification => notification._id !== messageId));
}

// For Login
function setLoginInfo(payload) {
  getDataCursor().set('loggedInUser', payload);
}

module.exports = {
  getDataCursor,
  getMatches,
  getMatchesForManageTeams,
  getAllowedPlayersByMatchId,
  getMyTeamByMatchId,
  saveTeam,
  setCurrentMatchIdForManageTeam,
  setTeamPlayers,
  getMatchesForWinners,
  getResultsByMatchId,
  setCurrentMatchIdForWinner,
  pushNotifications,
  removeNotification,
  setLoginInfo
};
