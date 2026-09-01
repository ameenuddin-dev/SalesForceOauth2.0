# Salesforce CRUD Frontend

## Flow

React :3000 -> GET /auth/login -> Express :5000 -> Salesforce OAuth 2.0 + PKCE -> Express /auth/oauth/callback -> set HttpOnly `authToken` cookie -> redirect to React `/oauth/callback` -> React calls `/auth/me` -> ProtectedRoute -> Dashboard -> CRUD APIs -> Express JWT middleware -> Salesforce REST API.

## Install

```bash
npm install
cp .env.example .env
npm run dev
```

## Backend changes required for this cookie architecture

Install:
```bash
npm install cors cookie-parser
```

In server.js:
```js
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
```

In OAuth callback, after generating your JWT:
```js
res.cookie('authToken', token, {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  maxAge: 1000 * 60 * 30,
});

delete req.session.codeVerifier;

return res.redirect('http://localhost:3000/oauth/callback');
```

Your `/auth/me` can read `req.cookies.authToken`.

Your Salesforce auth middleware should also read:
```js
const token = req.cookies.authToken;
```
not `req.headers.authorization`.

The frontend intentionally does not use localStorage, sessionStorage, or a JWT in the URL.
