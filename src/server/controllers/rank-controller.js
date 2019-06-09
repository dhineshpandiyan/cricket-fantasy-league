const rankService = require('../services/rank-service');

class RankController {

  static getRankListByMatchId(req, res) {
    try {
      const { matchId } = req.query || {};

      if (matchId) {
        res.json(rankService.getRankByMatchId(matchId));
      } else {
        res.status(404).json(utils.prepareErrorResponse(404, 'Missing query param'))
      }
    } catch(err) {
      res.status(500).json(utils.getStandardizedError(err))
    }

  }

}

module.exports = RankController;
