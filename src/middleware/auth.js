const JWToken = require('../utils/JsonWebToken');

module.exports = (req, res, next) => {
  //get token from header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'Authorization not found' });
  }
  try {
    const decode = JWToken.JWTdecoded(token);
    req.data = decode.data;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token is not valid ' + error.message });
  }
};
