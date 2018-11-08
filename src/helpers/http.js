
exports.createSuccessCallback = (data, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ status: 'success', data })
  }
  callback(null, response)
}

exports.createErrorCallback = (callback) => error => {
  const response = {
    statusCode: 400,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ status: 'error', error: error.message })
  }
  callback(null, response);
}
