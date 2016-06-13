'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SignupController = function () {
  //end-non-standard

  function SignupController(Auth, Agencies, $state) {
    _classCallCheck(this, SignupController);

    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.agencies = Agencies.query();
    this.$state = $state;
  }
  //start-non-standard


  _createClass(SignupController, [{
    key: 'register',
    value: function register(form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        var role = 'user';
        if (this.user.role != '') {
          role = this.user.role;
        }

        this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          id_agency: this.user.id_agency,
          role: role
        }).then(function () {
          // Account created, redirect to home
          _this.$state.go('main');
          // this.$state.go($state.current, {}, {reload: true});
        }).catch(function (err) {
          err = err.data;
          _this.errors = {};

          // Update validity of form fields that match the sequelize errors
          if (err.name) {
            angular.forEach(err.fields, function (field) {
              form[field].$setValidity('mongoose', false);
              _this.errors[field] = err.message;
            });
          }
        });
      }
    }
  }]);

  return SignupController;
}();

angular.module('homeServiceApp').controller('SignupController', SignupController);
//# sourceMappingURL=signup.controller.js.map
