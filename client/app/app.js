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
  'ngFileUpload',
  'ui.bootstrap',
  'ngCsv'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  // .config(function(paginationTemplateProvider) {
  //   paginationTemplateProvider.setString(require('./pagination.tpl.html'));
  // })
  .run(function(amMoment) {
    amMoment.changeLocale('id');
});
