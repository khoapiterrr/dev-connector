const jwt = require('jsonwebtoken');
const config = require('config');

const jwtSecret = config.get('jwtSecret');

const generateToken = (playLoad) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        data: playLoad,
      },
      jwtSecret,
      { expiresIn: 3600 * 24 },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      },
    );
  });
};
const decoded = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, function (err, decoded) {
      if (err) {
        console.log(err, 'error');
        reject(err);
      }
      resolve(decoded);
    });
  });
};
const JWTdecoded = (token) => {
  return jwt.verify(token, jwtSecret);
};
const JWToken = { decoded, generateToken, JWTdecoded };
module.exports = JWToken;
