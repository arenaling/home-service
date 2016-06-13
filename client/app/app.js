'use strict';

angular.module('homeServiceApp', [
  'homeServiceApp.auth',
  'homeServiceApp.admin',
  'homeServiceApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'angularMoment',
  'ngFileUpload'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .run(function(amMoment) {
    amMoment.changeLocale('id');
});