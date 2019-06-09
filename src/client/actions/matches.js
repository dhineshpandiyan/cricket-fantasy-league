const dataStore = require('../data-store');

class MatchAction {

  getMatches() {
    dataStore.getMatches();
  }

}

module.exports = new MatchAction();