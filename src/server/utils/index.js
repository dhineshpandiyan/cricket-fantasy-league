function prepareErrorResponse(status, message) {
  const error = {status, message};

  return {error};
}

function getStandardizedError(err) {
  const { message = 'Unknown error' } = err || {};

  return prepareErrorResponse(500, message);
}

module.exports = {
  prepareErrorResponse,
  getStandardizedError
};
