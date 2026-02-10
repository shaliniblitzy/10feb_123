/**
 * Endpoint Verification Tests — Express.js Tutorial Server
 *
 * Validates the two Express.js route handlers defined in index.js:
 *   - GET /         → should return HTTP 200 with body "Hello world"
 *   - GET /evening  → should return HTTP 200 with body "Good evening"
 *   - Unknown route → should return HTTP 404
 *
 * Uses only Node.js built-in modules (node:test, http, assert) so that
 * no additional test-framework dependencies are required.  The Express
 * app is imported directly (it is exported separately from the listen()
 * call) and bound to a random port to avoid conflicts.
 */

// ---------------------------------------------------------------------------
// Dependencies — all Node.js built-ins
// ---------------------------------------------------------------------------

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');

// Import the Express app instance (no server is started on import because
// index.js guards listen() behind a `require.main === module` check).
const app = require('../index.js');

// ---------------------------------------------------------------------------
// Helper — send a GET request and collect the full response
// ---------------------------------------------------------------------------

/**
 * Makes an HTTP GET request to the given path on the provided server
 * and resolves with { statusCode, body }.
 *
 * @param {import('http').Server} server - Active HTTP server to query.
 * @param {string} path - URL path (e.g. "/" or "/evening").
 * @returns {Promise<{ statusCode: number, body: string }>}
 */
function makeGetRequest(server, path) {
  return new Promise((resolve, reject) => {
    const { port } = server.address();
    const url = `http://127.0.0.1:${port}${path}`;

    http.get(url, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({ statusCode: res.statusCode, body }));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// ---------------------------------------------------------------------------
// Test Suite
// ---------------------------------------------------------------------------

describe('Express Tutorial Server — Endpoint Tests', () => {
  /** @type {import('http').Server} */
  let server;

  // Start a temporary server on a random available port before all tests.
  before(() => {
    return new Promise((resolve) => {
      server = app.listen(0, () => {
        resolve();
      });
    });
  });

  // Shut down the server cleanly after all tests complete.
  after(() => {
    return new Promise((resolve) => {
      if (server) {
        server.close(resolve);
      } else {
        resolve();
      }
    });
  });

  // -------------------------------------------------------------------------
  // Test 1 — GET / returns "Hello world"
  // -------------------------------------------------------------------------

  test('GET / responds with HTTP 200 and body "Hello world"', async () => {
    const res = await makeGetRequest(server, '/');
    assert.strictEqual(res.statusCode, 200, 'Expected HTTP 200 status code');
    assert.strictEqual(res.body, 'Hello world', 'Expected body to be "Hello world"');
  });

  // -------------------------------------------------------------------------
  // Test 2 — GET /evening returns "Good evening"
  // -------------------------------------------------------------------------

  test('GET /evening responds with HTTP 200 and body "Good evening"', async () => {
    const res = await makeGetRequest(server, '/evening');
    assert.strictEqual(res.statusCode, 200, 'Expected HTTP 200 status code');
    assert.strictEqual(res.body, 'Good evening', 'Expected body to be "Good evening"');
  });

  // -------------------------------------------------------------------------
  // Test 3 — Unknown route returns 404
  // -------------------------------------------------------------------------

  test('GET /nonexistent responds with HTTP 404', async () => {
    const res = await makeGetRequest(server, '/nonexistent');
    assert.strictEqual(res.statusCode, 404, 'Expected HTTP 404 for unknown route');
  });
});
