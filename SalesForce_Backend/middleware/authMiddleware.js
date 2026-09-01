const { verifyToken } = require("../utils/jwt");

function checkSalesForceAuth(req, res, next) {
  try {
    console.log("========== AUTH MIDDLEWARE ==========");

    const token = req.cookies.authToken;

    console.log("COOKIE TOKEN EXISTS:", !!token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication cookie missing",
      });
    }

    const decoded = verifyToken(token);

    console.log("JWT DECODED:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

module.exports = checkSalesForceAuth;
