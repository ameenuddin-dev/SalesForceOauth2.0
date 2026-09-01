const crypto = require("crypto");

// Generate PKCE verifier
function generateCodeVerifier() {
  return crypto.randomBytes(32).toString("base64url");
}

// Generate PKCE challenge
function generateCodeChallenge(verifier) {
  return crypto.createHash("sha256").update(verifier).digest("base64url");
}

module.exports = { generateCodeVerifier, generateCodeChallenge };
