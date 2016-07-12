module.exports = (request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  next();
};
