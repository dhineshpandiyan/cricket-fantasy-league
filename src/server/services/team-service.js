const moment = require('moment');
const dataAccess = require('../data-access');
const utils = require('../utils');

function getPlayersByMatchId(matchId) {
  const { teams = [] } = dataAccess.getMatchById(matchId) || {};

  return teams.reduce((players, team) => {
    players.push(...dataAccess.getPlayersByTeamId(team));

    return players;
  }, []);
}

function buildTeam(userId, name, matchId, players = []) {
  const { startsAt } = dataAccess.getMatchById(matchId);

  if (moment(startsAt).valueOf() <= moment.valueOf()) {
    return utils.prepareErrorResponse(403, 'You are not allowed to edit players after match starts');
  }
  if (players.length > 11) {
    return utils.prepareErrorResponse(400, 'Number of players should not exceed 11');
  }
  const allowedPrayersSet = new Set(getPlayersByMatchId(matchId).map(player => player._id));
  const hasInvalidPlayers = players.every(player => allowedPrayersSet.has(player._id));

  if (hasInvalidPlayers) {
    return utils.prepareErrorResponse(400, 'Players list has some invalid players');
  }
  dataAccess.saveTeam(userId, name, matchId, players);
}

function getTeam(userId, matchId) {
  return dataAccess.getTeam(userId, matchId);
}

module.exports = {
  getPlayersByMatchId,
  buildTeam,
  getTeam
};
