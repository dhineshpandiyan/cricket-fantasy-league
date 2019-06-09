const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const parseFBToken = require('./middlewares/parseFBToken');

const TeamController = require('./controllers/team-controller');
const MatchController = require('./controllers/match-controller');
const RankController = require('./controllers/rank-controller');

const app = express();

// UI resource distributer
app.use(express.static('dist'));

// Middlewares
app.use(cookieParser());
app.use(parseFBToken);

// Server endpoints
app.get('/api/v1/sports-service/players', TeamController.getPlayersByMatchId);
app.post('/api/v1/sports-service/players', bodyParser.urlencoded(), bodyParser.json(), TeamController.buildTeamByMatchId);
app.get('/api/v1/sports-service/team', TeamController.getMyTeamByMatchId);

app.get('/api/v1/sports-service/match', MatchController.getMatchById);
app.get('/api/v1/sports-service/matches', MatchController.getMatches);

app.get('/api/v1/sports-service/ranks', RankController.getRankListByMatchId);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
