/**
 * Express.js Tutorial Server — Main Entry Point
 *
 * A minimal Node.js server built with Express.js that demonstrates
 * basic HTTP routing with two GET endpoints:
 *   - GET /         → responds with "Hello world"
 *   - GET /evening  → responds with "Good evening"
 *
 * Usage:
 *   npm start          (starts the server on the configured port)
 *   node index.js      (alternative direct invocation)
 *
 * The app instance is exported separately from the listen() call
 * so that test suites can import the app and perform HTTP assertions
 * without binding to a TCP port.
 */

// ---------------------------------------------------------------------------
// Dependencies
// ---------------------------------------------------------------------------

const express = require('express');

// ---------------------------------------------------------------------------
// Application Initialization
// ---------------------------------------------------------------------------

/** Create the Express application instance. */
const app = express();

// ---------------------------------------------------------------------------
// Route Definitions
// ---------------------------------------------------------------------------

/**
 * GET /
 * Returns the plain-text greeting "Hello world".
 */
app.get('/', (req, res) => {
  res.send('Hello world');
});

/**
 * GET /evening
 * Returns the plain-text greeting "Good evening".
 */
app.get('/evening', (req, res) => {
  res.send('Good evening');
});

// ---------------------------------------------------------------------------
// Server Startup
// ---------------------------------------------------------------------------

/** Port the server will listen on — honours the PORT environment variable. */
const PORT = process.env.PORT || 3000;

/**
 * Start the HTTP listener only when this file is executed directly
 * (e.g. `node index.js` or `npm start`).  When the file is imported
 * by a test runner via require(), the listener is NOT started, which
 * prevents port-conflict errors during automated testing.
 */
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// ---------------------------------------------------------------------------
// Module Export
// ---------------------------------------------------------------------------

/**
 * Export the Express app instance so that test files can import it
 * and issue HTTP requests against the app without a live server.
 */
module.exports = app;
