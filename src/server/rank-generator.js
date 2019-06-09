const fs = require("fs");
const rankGenerationSecrets = require('./mock-data/ranking-secrets.json');
const ranklist = require('./mock-data/ranklist') || {};

const MATCH_ID = '1'; // Replace with currect match id
const USERS_DIR_PATH = "src/server/mock-data/users/";
const USERS_REL_PATH = "./mock-data/users/";
const RANK_DIR_PATH = "src/server/mock-data/ranklist/index.json";

const files = fs.readdirSync(USERS_DIR_PATH);
const secretSet = rankGenerationSecrets.reduce((acc, player) => {
  acc[player._id] = player.score;

  return acc;
}, {});

ranklist[MATCH_ID] = {}
files.forEach(file => {
  const { userId, name, matches = {} } = require(`${USERS_REL_PATH}${file}`) || {};
  const { players = [] } = matches[MATCH_ID] || {};

  ranklist[MATCH_ID][userId] = {
    userId,
    name,
    score: players.reduce((accScore, playerId) => accScore + secretSet[playerId], 0)
  };
});

fs.writeFileSync(RANK_DIR_PATH, JSON.stringify(ranklist));

console.log('Rank generation - DONE');
