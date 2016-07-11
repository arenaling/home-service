'use strict';

angular.module('homeServiceApp')
  .factory('Sales', function ($resource) {
    return $resource('/api/sales/:id', null, {
      'remove': {method: 'DELETE'},
      'get': {method: 'GET'},
      'query': {method: 'GET', isArray: true},
      'count': {method: 'GET', url: "/api/sales/count"},
      'save': {method: 'POST'},
      'update': {method: 'PUT'},
      'delete': {method: 'DELETE'},
    })
  });
