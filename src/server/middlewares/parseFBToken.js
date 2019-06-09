const axios = require('axios');
const utils = require('../utils');

function parseFBToken(req, res, next) {
  if (req.cookies.token) {
    axios.get(`https://graph.facebook.com/me?access_token=${req.cookies.token}`)
      .then(({ status, data }) => {
        if (status === 200) {
          if (!req.context) {
            req.context = {};
          }
          req.context.userId = data.id;
          req.context.name = data.name;

          next();
        } else {
          res.status(500).json(utils.prepareErrorResponse(500, 'Invalid token'));
        }
      })
      .catch((err) => {
        res.status(500).json(utils.prepareErrorResponse(500, 'Unexpected error'));
      });
  } else {
    res.status(500).json(utils.prepareErrorResponse(500, 'Invalid token'));
  }
}

module.exports = parseFBToken;