const jwt = require("jsonwebtoken");

function generateToken(data) {
  return jwt.sign(
    {
      accessToken: data.accessToken,
      instanceUrl: data.instanceUrl,
      salesforceUser: data.salesforceUser,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5m",
    },
  );
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  generateToken,
  verifyToken,
};
