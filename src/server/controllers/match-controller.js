const matchService = require('../services/match-service');
const utils = require('../utils');

class MatchController {

  static getMatchById(req, res) {
    try {
      const { matchId } = req.query || {};

      if (matchId) {
        res.json(matchService.getMatchById(matchId));
      } else {
        res.status(404).json(utils.prepareErrorResponse(404, 'Missing query param'))
      }
    } catch(err) {
      res.status(500).json(utils.getStandardizedError(err))
    }
  }

  static getMatches(req, res) {
    try {
      res.send(matchService.getMatches());
    } catch(err) {
      res.status(500).json(utils.getStandardizedError(err))
    }
  }

}

module.exports = MatchController;
