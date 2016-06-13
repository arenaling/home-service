'use strict';

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _sqldb = require('../../sqldb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user;
var genUser = function genUser() {
  user = _sqldb.User.build({
    provider: 'local',
    name: 'Fake User',
    email: 'test@example.com',
    password: 'password'
  });
  return user;
};

describe('User Model', function () {
  before(function () {
    // Sync and clear users before testing
    return _sqldb.User.sync().then(function () {
      return _sqldb.User.destroy({ where: {} });
    });
  });

  beforeEach(function () {
    genUser();
  });

  afterEach(function () {
    return _sqldb.User.destroy({ where: {} });
  });

  it('should begin with no users', function () {
    return expect(_sqldb.User.findAll()).to.eventually.have.length(0);
  });

  it('should fail when saving a duplicate user', function () {
    return expect(user.save().then(function () {
      var userDup = genUser();
      return userDup.save();
    })).to.be.rejected;
  });

  describe('#email', function () {
    it('should fail when saving without an email', function () {
      user.email = '';
      return expect(user.save()).to.be.rejected;
    });
  });

  describe('#password', function () {
    beforeEach(function () {
      return user.save();
    });

    it('should authenticate user if valid', function () {
      expect(user.authenticate('password')).to.be.true;
    });

    it('should not authenticate user if invalid', function () {
      expect(user.authenticate('blah')).to.not.be.true;
    });

    it('should remain the same hash unless the password is updated', function () {
      user.name = 'Test User';
      return expect(user.save().then(function (u) {
        return u.authenticate('password');
      })).to.eventually.be.true;
    });
  });
});
//# sourceMappingURL=user.model.spec.js.map
