'use strict';
(function(){

  angular.module('homeServiceApp')
    .controller('AgenciesController', function($scope, Agencies, Auth) {
    	$scope.agencies = Agencies.query();

        $scope.isAdmin = function() {
            return Auth.getCurrentUser().role == 'admin';
        };
    })
    .controller('AgencyViewCtrl', function($scope, $state, $stateParams, Agencies) {
    	$scope.agency = Agency.get({id: $stateParams.id});

    	$scope.deleteAgency = function() {
    		Agency.delete({id: $scope.agency._id}, function success(/* value, responseHeaders */) {
    			$state.go('agencies');
    		}, errorHandler($scope));
    	}
    })
    .controller('AgencyNewCtrl', function($scope, $state, Agencies) {
    	$scope.agency = {};
    	$scope.addAgency = function() {
    		Agencies.save($scope.agency, function success(value /*, responseHeaders */) {
    			$state.go('viewAgency', {id: value._id});
    		}, errorHandler($scope));
    	}
    })
    .controller('AgencyEditCtrl', function($scope, $state, $stateParams, Agencies) {
    	$scope.agency = Agencies.get({id: $stateParams.id});

    	$scope.editAgency = function() {
    		Agencies.update({id: $scope.agency._id}, $scope.agency, function success(value /*, responseHeaders */) {
    			$state.go('viewAgency', {id: value._id});
    		}, errorHandler($scope));
    	};
    });

    var errorHandler = function($scope) {
    	return function error(httpResponse) {
    		$scope.errors = httpResponse;
    	};
    };
})();
