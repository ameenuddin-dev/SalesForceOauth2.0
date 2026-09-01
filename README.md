# Salesforce CRUD Management Application

A full-stack web application that allows users to authenticate with Salesforce using **OAuth 2.0 with PKCE** and perform CRUD operations on Salesforce standard objects without using the native Salesforce interface.

The application provides a centralized dashboard where users can select a Salesforce object and view, create, update, and delete records.

---

## 🚀 Project Overview

This project was developed as part of an **Associate Software Engineer – Salesforce OAuth CRUD Assignment**.

The application integrates a React frontend with a Node.js/Express backend and Salesforce REST APIs.

Users can work with the following Salesforce standard objects:

* Account
* Opportunity
* Lead
* Contact
* Case

After authenticating with Salesforce, the application uses the Salesforce OAuth access token to securely communicate with the Salesforce REST API.

---

## ✨ Features

### 🔐 Salesforce OAuth Authentication

* Salesforce login button
* OAuth 2.0 Authorization Code flow
* PKCE implementation
* Salesforce External Client App integration
* Secure token exchange on the backend
* Application JWT authentication
* Protected Salesforce API routes

### 📊 Salesforce Dashboard

* Central Salesforce object selector
* Dynamic object fields
* Dynamic record table
* Responsive dashboard UI
* Salesforce connection status
* Record statistics

### 📄 Pagination

* Loads 20 records at a time
* Supports loading additional records
* Infinite-scroll style record loading
* Prevents unnecessary API requests

### ➕ Create Records

Users can create Salesforce records directly from the application.

Supported objects:

```text
Account
Opportunity
Lead
Contact
Case
```

### ✏️ Update Records

Users can select an existing record and update its fields without opening the Salesforce native interface.

### 🗑️ Delete Records

Users can delete records through the application with a confirmation dialog.

### 🔔 User Feedback

The application provides toast notifications for:

* Successful creation
* Successful updates
* Successful deletion
* Authentication errors
* API failures

---

# 🏗️ Architecture

The project follows a separated frontend/backend architecture.

```text
                    ┌──────────────────────┐
                    │      User Browser    │
                    │                      │
                    │   React + Tailwind   │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST
                               ▼
                    ┌──────────────────────┐
                    │    Node.js Server    │
                    │      Express.js      │
                    └──────────┬───────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
       ┌─────────────────┐          ┌──────────────────┐
       │ Authentication  │          │ Salesforce CRUD  │
       │     Routes      │          │      Routes      │
       └────────┬────────┘          └─────────┬────────┘
                │                             │
                ▼                             │
       ┌─────────────────┐                    │
       │ Salesforce OAuth│                    │
       │   2.0 + PKCE    │                    │
       └────────┬────────┘                    │
                │                             │
                └──────────────┬──────────────┘
                               ▼
                    ┌──────────────────────┐
                    │ Salesforce REST API  │
                    │                      │
                    │ Account              │
                    │ Opportunity          │
                    │ Lead                 │
                    │ Contact              │
                    │ Case                 │
                    └──────────────────────┘
```

---

# 📁 Project Structure

```text
salesforce-crud/
│
├── backend/
│   │
│   ├── config/
│   │   └── salesforceObjects.js
│   │
│   ├── controller/
│   │   ├── authController.js
│   │   └── salesForceController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── router/
│   │   ├── authRoutes.js
│   │   └── salesforceRoutes.js
│   │
│   ├── services/
│   │   └── salesForceServices.js
│   │
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── pkce.js
│   │   └── salesforceConfig.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── comman/
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   │
│   │   │   └── salesforce/
│   │   │       ├── ObjectSelector.jsx
│   │   │       ├── RecordsTable.jsx
│   │   │       └── RecordModal.jsx
│   │   │
│   │   ├── config/
│   │   │   └── salesforceObjects.js
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useSalesforceRecords.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── OAuthCallback.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── salesforceApi.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# 🛠️ Technologies Used

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React
* Sonner

## Backend

* Node.js
* Express.js
* Axios
* Express Session
* JSON Web Token
* PKCE
* dotenv

## Salesforce

* Salesforce Developer Org
* External Client App
* OAuth 2.0
* Salesforce REST API
* SOQL

---

# 🔐 Authentication Flow

The application uses Salesforce OAuth 2.0 with PKCE.

The authentication flow works as follows:

```text
User
 │
 │ Click Login
 ▼
React Frontend
 │
 │ GET /auth/login
 ▼
Node.js Backend
 │
 │ Generate Code Verifier
 │ Generate Code Challenge
 ▼
Salesforce Authorization
 │
 │ User Login + Authorization
 ▼
Salesforce
 │
 │ Authorization Code
 ▼
Backend OAuth Callback
 │
 │ Exchange Code + Code Verifier
 ▼
Salesforce Token Endpoint
 │
 │ Access Token
 ▼
Backend
 │
 │ Generate Application JWT
 ▼
Frontend
 │
 │ Store JWT in application memory
 ▼
Dashboard
```

---

# 🔑 PKCE Flow

The backend generates:

```text
Code Verifier
      │
      ▼
SHA-256
      │
      ▼
Code Challenge
```

The code challenge is sent to Salesforce during authorization.

After Salesforce authentication, Salesforce returns an authorization code.

The backend sends:

```text
Authorization Code
+
Code Verifier
+
Client ID
+
Client Secret
+
Redirect URI
```

to the Salesforce token endpoint.

Salesforce then returns the access token.

---

# 🔄 CRUD API Flow

After authentication, the frontend communicates with the Node.js backend.

The backend validates the application JWT using authentication middleware.

```text
React
 │
 │ Authorization: Bearer <JWT>
 ▼
Express API
 │
 ▼
JWT Middleware
 │
 │ Verify JWT
 ▼
Salesforce Controller
 │
 ▼
Salesforce Service
 │
 ▼
Salesforce REST API
```

---

# 📡 API Endpoints

## Authentication

### Salesforce Login

```http
GET /auth/login
```

Starts Salesforce OAuth authentication.

---

### OAuth Callback

```http
GET /auth/oauth/callback
```

Receives the Salesforce authorization code and exchanges it for an access token.

---

### Current User

```http
GET /auth/me
```

Checks whether the current application session is authenticated.

---

# Salesforce APIs

## Get Records

```http
GET /api/salesforce/query
```

Example:

```http
GET /api/salesforce/query?object=Account&page=1&limit=20
```

Parameters:

```text
object = Account
page   = 1
limit  = 20
```

Supported objects:

```text
Account
Opportunity
Lead
Contact
Case
```

---

## Create Record

```http
POST /api/salesforce/record?object=Account
```

Example request:

```json
{
  "Name": "ABC Technologies",
  "Phone": "9876543210",
  "Industry": "Technology"
}
```

---

## Update Record

```http
PATCH /api/salesforce/record/:id?object=Account
```

Example:

```http
PATCH /api/salesforce/record/001XXXXXXXXXXXX?object=Account
```

---

## Delete Record

```http
DELETE /api/salesforce/record/:id?object=Account
```

Example:

```http
DELETE /api/salesforce/record/001XXXXXXXXXXXX?object=Account
```

---

# 📄 Pagination

The application loads records in batches of 20.

For example:

```text
Page 1
   ↓
20 records

Page 2
   ↓
20 records

Page 3
   ↓
20 records
```

The backend calculates the Salesforce SOQL offset:

```javascript
const offset = (page - 1) * limit;
```

Example:

```text
Page 1 → OFFSET 0
Page 2 → OFFSET 20
Page 3 → OFFSET 40
Page 4 → OFFSET 60
```

This allows the frontend to load additional records as the user scrolls.

---

# ⚙️ Installation

## Prerequisites

Install:

* Node.js
* npm
* Salesforce Developer Org
* Salesforce External Client App

Check Node.js:

```bash
node --version
```

Check npm:

```bash
npm --version
```

---

# 🔧 Backend Setup

Go to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
backend/.env
```

Example:

```env
PORT=5000

CLIENT_ID=your_salesforce_client_id

CLIENT_SECRET=your_salesforce_client_secret

REDIRECT_URI=http://localhost:5000/auth/oauth/callback

SESSION_SECRET=your_session_secret

JWT_SECRET=your_jwt_secret
```

Start backend:

```bash
npm start
```

or, if using nodemon:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# 🎨 Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

# 🔒 Environment Variables

Never commit your actual `.env` files to GitHub.

Use `.env.example` files instead.

Example:

```text
.env              ← DO NOT COMMIT
.env.example      ← COMMIT
```

The `.gitignore` contains:

```gitignore
.env
.env.*
!.env.example
```

---

# 🧪 Testing

The backend APIs can be tested using Postman.

Example:

```text
GET
http://localhost:5000/api/salesforce/query?object=Account&page=1&limit=20
```

Authorization:

```http
Authorization: Bearer <APPLICATION_JWT>
```

The application JWT is generated by the backend after successful Salesforce authentication.

---

# 🔐 Security

The application implements several security mechanisms:

* OAuth 2.0
* PKCE
* JWT authentication
* Protected backend routes
* HTTP-only session cookies
* Environment variables for secrets
* Backend-only Salesforce token exchange
* Authorization header validation

Salesforce client credentials are never exposed in the React frontend.

---

# 📱 Responsive UI

The frontend is designed using Tailwind CSS and supports:

* Desktop
* Laptop
* Tablet
* Mobile

The dashboard includes:

* Responsive navigation
* Responsive tables
* Modal forms
* Loading states
* Empty states
* Error states
* Toast notifications

---

# 🚀 Deployment

The frontend and backend can be deployed separately.

Example architecture:

```text
                    Internet
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
    Frontend Hosting          Backend Hosting
    React + Vite              Node + Express
          │                         │
          └───────────┬─────────────┘
                      │
                      ▼
              Salesforce API
```

Before deployment, update:

```env
VITE_API_BASE_URL
```

and the backend:

```env
REDIRECT_URI
```

to the production URLs.

The Salesforce External Client App callback URL must also match the production callback URL.

---

# 📌 Future Improvements

Possible future enhancements include:

* Advanced search
* Server-side filtering
* Sorting
* Column customization
* Salesforce field metadata API
* Better pagination using Salesforce query cursors
* Bulk record operations
* Role-based access control
* Production-grade session storage
* Automated testing
* Docker deployment
* CI/CD pipeline
* Salesforce Platform Events integration

---

# 👨‍💻 Author

**Ameenuddin M M**

Full Stack Developer

Technologies:

```text
Java
Spring Boot
React
Node.js
Express.js
MongoDB
MySQL
AWS
Salesforce
```

---

# 📄 Assignment Requirements

| Requirement              | Status |
| ------------------------ | ------ |
| Salesforce Developer Org | ✅      |
| External Client App      | ✅      |
| OAuth 2.0                | ✅      |
| PKCE                     | ✅      |
| React Frontend           | ✅      |
| Node.js Backend          | ✅      |
| Account                  | ✅      |
| Opportunity              | ✅      |
| Lead                     | ✅      |
| Contact                  | ✅      |
| Case                     | ✅      |
| Create                   | ✅      |
| Read                     | ✅      |
| Update                   | ✅      |
| Delete                   | ✅      |
| 20 Records Pagination    | ✅      |
| Infinite Loading         | ✅      |
| Responsive UI            | ✅      |
| Deployment               | 🔄     |

---

## ⭐ Project Summary

This project demonstrates a complete **full-stack Salesforce integration** using React, Node.js, Express, OAuth 2.0, PKCE, JWT authentication, and the Salesforce REST API.

The main goal is to provide users with a modern web interface for managing Salesforce standard objects while keeping Salesforce authentication and API credentials securely handled by the backend.
