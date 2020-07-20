/**
 * Module dependencies.
 */
const debug = require('debug')('deadeok-share-resource-platform:server');
const path = require('path');
const http = require('http');
const dotenv = require('dotenv');

/**
 * Set public env before call ../app.js
 */
const dirRoot = path.normalize(path.join(__dirname, '..'));
const envPublicPath = path.join(dirRoot, 'envs', 'public.env');
dotenv.config({ path: envPublicPath });

const app = require('../app');
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;
  // handle specific listen errors with friendly messages
  if (error.code === 'EACCES') {
    console.log(`${bind} requires elevated privileges`);
    return;
  }
  if (error.code === 'EADDRINUSE') {
    console.log(`${bind} is already in use`);
    return;
  }
  throw error;
}

/**
 * Create HTTP server.
 */
app.set('port', port);
const server = http.createServer(app);

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `${addr}`
    : `${addr.port}`;
  debug(`Listening on http://localhost:${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
