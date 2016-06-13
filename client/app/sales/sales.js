'use strict';

angular.module('homeServiceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sales', {
        url: '/sales',
        templateUrl: 'app/sales/sales.html',
        controller: 'SalesComponent',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('viewSales', {
        url: '/sales/:id',
        templateUrl: 'app/sales/sales-view.html',
        controller: 'SalesViewComponent',
        controllerAs: 'vm',
        authenticate: true
      });
  });
