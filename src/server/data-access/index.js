const fs = require('fs');
const moment = require('moment');

const matches = require('../mock-data/matches/index.json');
const engPlayers = require('../mock-data/players/ENG.json');
const indPlayers = require('../mock-data/players/IND.json');
const pakPlayers = require('../mock-data/players/PAK.json');

const USERS = 'src/server/mock-data/users/';
const USERS_RELATIVE_PATH = '../mock-data/users/';
const RANK_REPORT = '../mock-data/ranklist/index.json';

const allPlayers = {
  ENG: engPlayers,
  IND: indPlayers,
  PAK: pakPlayers
};

function getPlayersByTeamId(teamId) {
  return allPlayers[teamId] || [];
}

function getMatchById(matchId) {
  return matches.find(match => match._id === matchId) || {};
}

function getAllMatches() {
  return matches;
}

function saveTeam(userId, name, matchId, players) {
  const fileName = `${userId}.json`;
  const dataPath = `${USERS}${fileName}`;
  let data = {
    userId,
    name,
    matches: {}
  };

  if (fs.existsSync(dataPath)) {
    data = require(`${USERS_RELATIVE_PATH}${fileName}`);
  }
  data.matches[matchId] = {
    players,
    lastModifiedAt: moment().valueOf()
  };

  fs.writeFileSync(dataPath, JSON.stringify(data));
}

function getTeam(userId, matchId) {
  const fileName = `${userId}.json`;
  const dataPath = `${USERS}${fileName}`;

  if (fs.existsSync(dataPath)) {
    const data = require(`${USERS_RELATIVE_PATH}${fileName}`);

    return data.matches[matchId] || {};
  }

  return [];
}

function getRankByMatchId(matchId) {
  const rankReport = require(RANK_REPORT) || {}
  const match = rankReport[matchId] || {};

  return Object.keys(match).reduce((accRankList, key) => {
    const { userId, name, score } = match[key];

    accRankList.push({userId, name, score});

    return accRankList;
  }, []);
}

module.exports = {
  getPlayersByTeamId,
  getMatchById,
  getAllMatches,
  saveTeam,
  getTeam,
  getRankByMatchId
};