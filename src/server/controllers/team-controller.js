const teamService = require('../services/team-service');
const utils = require('../utils');

class TeamController {

  static getPlayersByMatchId(req, res) {
    try {
      const { matchId } = req.query || {};

      if (matchId) {
        res.json(teamService.getPlayersByMatchId(matchId));
      } else {
        res.status(404).json(utils.prepareErrorResponse(404, 'Missing query param'))
      }
    } catch (err) {
      res.status(500).json(utils.getStandardizedError(err))
    }
  }

  static buildTeamByMatchId(req, res) {
    try {
      const { userId, name } = req.context || {};
      const { data = {} } = req.body || {};

      if (data.matchId && data.players) {
        const response = teamService.buildTeam(userId, name, data.matchId, data.players);

        if (response && response.error) {
          return res.status(response.error.status).json(response)
        }

        res.json({data: 'Created'});
      } else {
        res.status(404).json(utils.prepareErrorResponse(404, 'Missing data'))
      }
    } catch (err) {
      res.status(500).json(utils.getStandardizedError(err))
    }
  }

  static getMyTeamByMatchId(req, res) {
    try {
      const { matchId } = req.query || {};
      const { userId } = req.context || {};

      if (matchId) {
        const team = teamService.getTeam(userId, matchId);

        if (team && team.error) {
          return res.status(response.error.status).json(response)
        }

        res.json(team);
      } else {
        res.status(404).json(utils.prepareErrorResponse(404, 'Missing data'))
      }
    } catch (err) {
      res.status(500).json(utils.getStandardizedError(err))
    }
  }

}

module.exports = TeamController;
