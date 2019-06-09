const dataAccess = require('../data-access');

function getRankByMatchId(matchId) {
  if (matchId) {
    const rank = dataAccess.getRankByMatchId(matchId);

    return rank.sort((a, b) => {
      return b.score - a.score;
    });
  }
  return {};
}

module.exports = {
  getRankByMatchId
};
