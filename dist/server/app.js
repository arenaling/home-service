/**
 * Main application file
 */

'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sqldb = require('./sqldb');

var _sqldb2 = _interopRequireDefault(_sqldb);

var _environment = require('./config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Populate databases with sample data
if (_environment2.default.seedDB) {
  require('./config/seed');
}

// Setup server
var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(_environment2.default.port, _environment2.default.ip, function () {
    console.log('Express server listening on %d, in %s mode', _environment2.default.port, app.get('env'));
  });
}

_sqldb2.default.sequelize.sync().then(startServer).catch(function (err) {
  console.log('Server failed to start due to error: %s', err);
});

// Expose app
exports = module.exports = app;
//# sourceMappingURL=app.js.map
