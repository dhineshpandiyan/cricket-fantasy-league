const dataStore = require('../data-store');

class ManageTeamAction {

  getMatches() {
    dataStore.getMatchesForManageTeams();
  }

  getAllowedPlayersByMatchId(matchId) {
    dataStore.getAllowedPlayersByMatchId(matchId);
  }

  getMyTeamByMatchId(matchId) {
    dataStore.getMyTeamByMatchId(matchId);
  }

  saveTeam(payload, callback) {
    dataStore.saveTeam(payload, callback);
  }

  setCurrentMatchIdForManageTeam(matchId) {
    dataStore.setCurrentMatchIdForManageTeam(matchId);
  }

  setTeamPlayers(teamPlayers) {
    dataStore.setTeamPlayers(teamPlayers);
  }

}

module.exports = new ManageTeamAction();