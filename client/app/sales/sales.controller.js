'use strict';


(function(){
   var errorHandler;
   var uploadHander;

	angular.module('homeServiceApp')
	.controller('SalesComponent', function($scope, $state, Sales, Auth, Agencies, Upload, $timeout) {
		var currentUser = Auth.getCurrentUser();
		var agency = {};
		var queryQuery = {};

		if(currentUser.role == 'agencies') {
			queryQuery['id_agencies'] = currentUser.id_agency;
		} else if(currentUser.role == 'verificator') {
         queryQuery['status'] = "1";
      } else if(currentUser.role == 'inputer') {
         queryQuery['status'] = "2";
      }

		$scope.salesData = Sales.query(queryQuery);
		$scope.sales = {'panggilan': 'Tuan'};
		$scope.currentUser = currentUser;

		if(currentUser.id_agency > 0) {
			agency = Agencies.get({id: currentUser.id_agency});
		}

		$scope.isAdmin = function() {
			return currentUser.role == 'admin';
		};

		$scope.isAgency = function() {
			return currentUser.role == 'agencies';
		};

      $scope.isSameAgency = function(sales) {
         return currentUser.role == 'agencies' && currentUser.id_agency == sales.id_agencies;
      };

		$scope.isVerificator = function() {
			return currentUser.role == 'verificator';
		};


		$scope.isInputer = function() {
			return currentUser.role == 'inputer';
		};

		$scope.canAmbil = function(sales) {
         if(sales.sedang_diambil == currentUser._id) {
            return true;
         }

			if(sales.sedang_diambil == 0) {
				if(currentUser.role == 'verificator' && (sales.hasil_verifikasi == null || sales.hasil_verifikasi == '')) {
					return true;
				}
				if(currentUser.role == 'inputer' && sales.hasil_verifikasi !== null && sales.hasil_verifikasi !== '' && sales.hasil_verifikasi !== "NOT OK") {
					return true;
				}
			}

			return false;
		};

		$scope.getStatus = function(sales) {
			if((sales.hasil_verifikasi == null || sales.hasil_verifikasi == '')) {
				return 'Belum Diverifikasi';
			} else if((sales.hasil_verifikasi !== null && sales.hasil_verifikasi !== '')) {
				return 'Sudah Diverifikasi';
			} else if((sales.inputer !== null && sales.inputer !== 0)) {
				return 'Sudah Diinput';
			}
		};

		$scope.addSales = function() {
			if(currentUser.id_agency > 0) {
				this.sales.id_agencies = currentUser.id_agency;
				this.sales.nama_agency = agency.name;
			}

			this.sales.tanggal_penyerahan = new Date();
         this.sales.status = "Belum Diverifikasi";

			Sales.save(this.sales, function success(value /*, responseHeaders */) {
				// $state.go('sales', {id: value._id});
				$state.go($state.current, {}, {reload: true});
			}, function($scope) {
				return function error(httpResponse) {
					$scope.errors = httpResponse;
				};
			});
		};

      $scope.upload = uploadHander($scope, Upload, $timeout);

		$scope.ambil = function(sales) {
			Sales.update({id: sales._id}, {'sedang_diambil': currentUser._id}, function success(value /*, responseHeaders */) {
				$state.go('viewSales', {id: sales._id});
			}, function($scope) {
				return function error(httpResponse) {
					$scope.errors = httpResponse;
				};
			});
		};
	})
	.controller('SalesViewComponent', function($scope, $state, $stateParams, Sales, Auth) {
		$scope.sales = Sales.get({id: $stateParams.id});
		var currentUser = Auth.getCurrentUser();

		$scope.isVerificator = function() {
			return currentUser.role == 'verificator';
		};


		$scope.isInputer = function() {
			return currentUser.role == 'inputer';
		};

		$scope.deleteSales = function() {
			Sales.delete({id: $scope.sales._id}, function success(/* value, responseHeaders */) {
				$state.go('sales');
			}, function($scope) {
				return function error(httpResponse) {
					$scope.errors = httpResponse;
				};
			});
		};

		$scope.lepas = function(sales) {
			Sales.update({id: sales._id}, {'sedang_diambil': 0}, function success(value /*, responseHeaders */) {
				$state.go('sales');
			}, function($scope) {
				return function error(httpResponse) {
					$scope.errors = httpResponse;
				};
			});
		};

		$scope.updateSales = function() {
			if(currentUser.role == 'inputer') {
				$scope.sales.inputer = currentUser._id;
				$scope.sales.nama_inputer = currentUser.name;
				$scope.sales.sedang_diambil = 0;
			} else if(currentUser.role == 'verificator') {
            $scope.sales.verificator = currentUser._id;
            $scope.sales.nama_verificator = currentUser.name;
            $scope.sales.status = "Sudah Diverifikasi";
            $scope.sales.sedang_diambil = 0;
         }
			

			Sales.update({id: $scope.sales._id}, $scope.sales, function success(value /*, responseHeaders */) {
				$state.go('sales');
			}, function($scope) {
				return function error(httpResponse) {
					$scope.errors = httpResponse;
				};
			});
		};
	});

	errorHandler = function ($scope){
		return function error(httpResponse){
			$scope.errors = httpResponse;
		};
	};

	uploadHander = function ($scope, Upload, $timeout) {
		return function(file, sales) {
			if (file && !file.$error) {
            sales.file = file;
				file.upload = Upload.upload({
					url: '/api/sales/'+sales._id+'/upload',
					file: file
				});

				file.upload.then(function (response) {
					$timeout(function () {
						file.result = response.data;
					});
				}, function (response) {
					if (response.status > 0){
						console.log(response.status + ': ' + response.data);
						errorHandler($scope)(response.status + ': ' + response.data);
					}
				});

				file.upload.progress(function (evt) {
					file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
			}
		};
	};
})();

