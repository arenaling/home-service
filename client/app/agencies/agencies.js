'use strict';

angular.module('homeServiceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('agencies', {
        url: '/agencies',
        templateUrl: 'app/agencies/templates/agency-list.html',
        controller: 'AgenciesController',
        controllerAs: 'agencyCtrl',
        authenticate: true
      })
      .state('newAgency', {
      	url: '/agencies/new',
      	templateUrl: 'app/agencies/templates/agency-new.html',
      	controller: 'AgencyNewCtrl',
        authenticate: true
      })
      .state('viewAgency', {
      	url: '/agencies/:id',
      	templateUrl: 'app/agencies/templates/agency-edit.html',
      	controller: 'AgencyEditCtrl',
        authenticate: true
      })
  });
