'use strict';

angular.module('homeServiceApp')
  .factory('Agencies', function ($resource) {
    return $resource('/api/agencies/:id', null, {
      'remove': {method: 'DELETE'},
      'get': {method: 'GET'},
      'query': {method: 'GET', isArray: true},
      'save': {method: 'POST'},
      'delete': {method: 'DELETE'},
    })
  });
