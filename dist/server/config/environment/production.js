'use strict';

// Production specific configuration
// =================================

module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,

  sequelize: {
    uri: 'mysql://root:5664@localhost:3306/homeservicedb',
    options: {}
  }
};
//# sourceMappingURL=production.js.map
