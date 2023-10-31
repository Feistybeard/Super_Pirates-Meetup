function sendResponse(code, response) {
  return {
    statusCode: code,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(response),
  };
}

function sendError(statusCode, message) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  };
}

module.exports = { sendResponse, sendError };
