'use strict';

// Development specific configuration
// ==================================

module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'mysql://root:5664@localhost:3306/homeservicedb',
    options: {}
  },

  // Seed database on startup
  seedDB: true

};
//# sourceMappingURL=development.js.map
