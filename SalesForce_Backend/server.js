const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./router/authRoutes");
const salesforceRoutes = require("./router/salesforceRoutes");

const app = express();

const PORT = 5000;

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(cookieParser());

// SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  }),
);

app.use(express.json());

// Authentication routes
app.use("/auth", authRoutes);

// Salesforce API routes
app.use("/", salesforceRoutes);

app.get("/test", (req, res) => {
  res.json({
    message: "Backend is working",
  });
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
