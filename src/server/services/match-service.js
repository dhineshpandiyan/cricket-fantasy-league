const dataAccess = require('../data-access');

function getMatchById(matchId) {
  if (matchId) {
    return dataAccess.getMatchById(matchId);
  }
  return {};
}

function getMatches() {
  return dataAccess.getAllMatches();
}

module.exports = {
  getMatchById,
  getMatches,
};
