'use strict';

angular.module('homeServiceApp.auth', [
  'homeServiceApp.constants',
  'homeServiceApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
