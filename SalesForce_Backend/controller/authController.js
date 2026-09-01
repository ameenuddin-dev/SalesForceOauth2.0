const axios = require("axios");

const {
  generateCodeVerifier,
  generateCodeChallenge,
} = require("../utils/pkce");

const { AUTHORIZATION_URL, TOKEN_URL } = require("../utils/salesforceConfig");

const { generateToken, verifyToken } = require("../utils/jwt");

// LOGIN
async function login(req, res) {
  try {
    const codeVerifier = generateCodeVerifier();

    const codeChallenge = generateCodeChallenge(codeVerifier);

    req.session.codeVerifier = codeVerifier;

    console.log("LOGIN SESSION ID:", req.sessionID);

    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);

        return res.status(500).send("Session save failed");
      }

      const authUrl =
        `${AUTHORIZATION_URL}?response_type=code` +
        `&client_id=${encodeURIComponent(process.env.CLIENT_ID)}` +
        `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}` +
        `&code_challenge=${encodeURIComponent(codeChallenge)}` +
        `&code_challenge_method=S256`;

      return res.redirect(authUrl);
    });
  } catch (error) {
    console.error("Login Error:", error.message);

    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
}
//callback
async function callback(req, res) {
  try {
    const code = req.query.code;

    if (!code) {
      return res.status(400).send("Authorization code not received!");
    }

    const codeVerifier = req.session.codeVerifier;

    if (!codeVerifier) {
      return res.status(400).send("Code verifier not found in session!");
    }

    // 1. Exchange authorization code for Salesforce tokens
    const response = await axios.post(
      TOKEN_URL,
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    console.log("SALESFORCE TOKEN SUCCESS");

    const accessToken = response.data.access_token;
    const instanceUrl = response.data.instance_url;
    const identityUrl = response.data.id;

    console.log("ACCESS TOKEN EXISTS:", !!accessToken);
    console.log("INSTANCE URL:", instanceUrl);
    console.log("IDENTITY URL:", identityUrl);

    // 2. Get logged-in Salesforce user
    const userResponse = await axios.get(identityUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("SALESFORCE USER:", JSON.stringify(userResponse.data, null, 2));

    // 3. Generate your application JWT
    const token = generateToken({
      accessToken,
      instanceUrl,

      salesforceUser: {
        id: userResponse.data.user_id,
        name: userResponse.data.name,
        email: userResponse.data.email,
        username: userResponse.data.preferred_username,
      },
    });

    console.log("JWT CREATED WITH SALESFORCE USER");

    // 4. Remove PKCE verifier
    delete req.session.codeVerifier;

    // 5. Save session
    req.session.save((err) => {
      if (err) {
        console.error("SESSION SAVE ERROR:", err);

        return res.status(500).json({
          message: "Failed to save Salesforce session",
        });
      }

      // 6. Store JWT in HttpOnly cookie
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      console.log("AUTH COOKIE CREATED");

      // 7. Redirect frontend
      return res.redirect("http://localhost:3000/dashboard");
    });
  } catch (error) {
    console.error("SALESFORCE ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      message: "Salesforce login failed",
      error: error.response?.data || error.message,
    });
  }
}

//Front end Conformation Api
async function getCurrentUser(req, res) {
  try {
    console.log("========== /auth/me ==========");

    const token = req.cookies.authToken;

    console.log("COOKIE TOKEN EXISTS:", !!token);

    if (!token) {
      return res.status(401).json({
        authenticated: false,
        message: "Not authenticated",
      });
    }

    const decoded = verifyToken(token);

    console.log("JWT DECODED:", decoded);

    return res.json({
      authenticated: true,
      user: decoded,
    });
  } catch (error) {
    console.error("AUTH ME ERROR:", error.message);

    return res.status(401).json({
      authenticated: false,
      message: "Invalid or expired token",
    });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
}
module.exports = { login, callback, getCurrentUser, logout };
