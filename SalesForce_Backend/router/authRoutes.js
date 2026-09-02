const express = require("express");

const router = express.Router();

const {
  login,
  callback,
  getCurrentUser,
  logout,
} = require("../controller/authController");

router.get("/test", (req, res) => {
  res.json({
    message: "Auth router works",
  });
});

// LOGIN
// router.get("/login", login);
router.get("/login", (req, res) => {
  res.json({
    message: "Login route works",
  });
});

//logout
router.post("/logout", logout);

// SALESFORCE OAUTH CALLBACK
router.get("/oauth/callback", callback);

router.get("/me", getCurrentUser);

module.exports = router;
