const dataStore = require('../data-store');

class WinnerAction {

  getMatches() {
    dataStore.getMatchesForWinners();
  }

  getResultsByMatchId(matchId) {
    dataStore.getResultsByMatchId(matchId);
  }

  setCurrentMatchId(matchId) {
    dataStore.setCurrentMatchIdForWinner(matchId);
  }

}

module.exports = new WinnerAction();