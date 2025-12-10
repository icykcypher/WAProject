# E-shop Backend Server

This repository contains a minimal **Express.js backend** for an e-shop, handling authentication, authorization, and purchase operations.

## Features

* **Express.js** server with JSON body parsing.
* **CORS** enabled for frontend integration.
* **JWT-based authentication** and capability-based authorization.
* Example endpoint `/api/buy-alcohol` with permission check.

## Server Setup

The server runs on `http://localhost:5000` by default and uses a hardcoded secret (`authServerSecret`) for JWT verification.

### Dependencies

* `express` – Web framework
* `cors` – Cross-Origin Resource Sharing
* `cookie-parser` – Parsing cookies
* `jsonwebtoken` – JWT authentication

Install dependencies with:

```bash
npm install express cors cookie-parser jsonwebtoken
```

### Running the Server

```bash
node server.js
```

or if you prefer using **nodemon** for auto-restart on changes:

```bash
npx nodemon server.js
```

The server will start and log:

```
Eshop server running on http://localhost:5000
```

## Authentication & Authorization

The server uses JWT tokens to authorize requests:

1. **Header format:**

   ```
   Authorization: Bearer <token>
   ```
2. **Token requirements:**

   * `iss` (issuer) must be “northauth”.
   * `aud` (audience) must be “eshop-service”.

Requests failing validation return `401 Unauthorized`.

### Example Endpoint: Buy Alcohol

**Endpoint:**

```
POST /api/buy-alcohol
```

**Authorization:** JWT with permission `buy_alcohol`.

**Response Example (Success):**

```json
{
  "success": true,
  "message": "permission given",
  "user": "<user_id>"
}
```

**Response Example (Failure):**

```json
{
  "success": false,
  "message": "A co jako! Je ti 18?!?"
}
```

## Project Structure

```
backend/
├─ server.js           # Main Express server
├─ package.json        # Project dependencies and scripts
├─ .gitignore          # Ignored files (node_modules, .env, logs)
├─ README.md           # This file
├─ .env.example        # Example environment variables
```

## Future Improvements

* Use **environment variables** for secrets instead of hardcoding `authServerSecret`.
* Split routes/controllers for cleaner structure.
* Add proper user management and database integration.
* Implement additional endpoints for the e-shop (cart, checkout, products, etc.).
