'use strict';


(function(){
   var errorHandler;
   var uploadHander;

	angular.module('homeServiceApp')
	.controller('SalesComponent', function($scope, $state, Sales, Auth, Agencies, Upload, $timeout) {
		var currentUser = Auth.getCurrentUser();
		var agency = {};
		var queryQuery = {};

    var reset_query = function() {
  		if(currentUser.role == 'agencies') {
  			queryQuery['id_agencies'] = currentUser.id_agency;
  		} else if(currentUser.role == 'verificator') {
         queryQuery['status'] = "1";
      } else if(currentUser.role == 'inputer') {
         queryQuery['status'] = "2";
      }
    }

		// $scope.salesData = Sales.query(queryQuery);
    $scope.pagination = {
        current: 1
    };
    $scope.filters = {
      tanggal: null
    };
    $scope.csvHeader = [[
            "_id",        "nama_panggilan",
            "tanggal_penyerahan",        "so",
            "sto",        "telepon",
            "panggilan",        "nama_pelanggan",
            "contact_person",        "email",
            "tempat_lahir",        "tanggal_lahir",
            "profesi",        "identitas",
            "nomor_identitas",        "kadaluarsa_identitas",
            "nama_ibu_kandung",        "alamat_instalasi",
            "k_contact",        "paket",
            "nama_sales",        "nama_agency",
            "keterangan",        "hasil_verifikasi",
            "detail_hasil_verifikasi",        "nama_verificator",
            "kelurahan",        "nomor_referensi",
            "odp_referensi",        "latitude",
            "longitude",        "manja",
            "nama_inputer",        "nomor_sc",
            "nomor_pots",        "nomor_internet",
            "keterangan_inputer",        "status",
            "updatedAt"
          ]];

    reset_query();
    querySales(queryQuery, 1);
    prepareCsvData();
    $scope.sales = {'panggilan': 'Tuan'};
		$scope.currentUser = currentUser;

    $scope.pageChanged = function() {
      querySales(queryQuery, $scope.pagination.current);
    };

    function querySales(queryQuery, pageNumber) {
      queryQuery['page'] = pageNumber;
      $scope.salesData = Sales.query(queryQuery);
      // $scope.salesDataWithHeader = [["nama_panggilan","_id","tanggal_penyerahan","so","sto","telepon","panggilan","nama_pelanggan","contact_person","email","tempat_lahir","tanggal_lahir","profesi","identitas","nomor_identitas","kadaluarsa_identitas","nama_ibu_kandung","alamat_instalasi","k_contact","paket","nama_sales","id_agencies","nama_agency","keterangan","hasil_verifikasi","detail_hasil_verifikasi","verificator","nama_verificator","kelurahan","nomor_referensi","odp_referensi","latitude","longitude","manja","inputer","nama_inputer","nomor_sc","nomor_pots","nomor_internet","keterangan_inputer","file_ktp",","sedang_diambil","createdAt","updatedAt"]];
      // $scope.salesDataWithHeader = $scope.salesDataWithHeader.concat($scope.salesData);
      var count = Sales.count(queryQuery, function() {
        $scope.totalItems = count.count;
      });
    }

		if(currentUser.id_agency > 0) {
			agency = Agencies.get({id: currentUser.id_agency});
		}

    function prepareCsvData() {
      $scope.csv_data = [];

      var copyQuery = queryQuery;
      delete copyQuery.page;
      var result = Sales.query(copyQuery).$promise.then(function(result) {
        var return2 = [];
        angular.forEach(result, function(row) {
          return2.push({
            "_id": row._id,        "nama_panggilan": row.nama_panggilan,
            "tanggal_penyerahan": row.tanggal_penyerahan,        "so": row.so,
            "sto": row.sto,        "telepon": row.telepon,
            "panggilan": row.panggilan,        "nama_pelanggan": row.nama_pelanggan,
            "contact_person": row.contact_person,        "email": row.email,
            "tempat_lahir": row.tempat_lahir,        "tanggal_lahir": row.tanggal_lahir,
            "profesi": row.profesi,        "identitas": row.identitas,
            "nomor_identitas": row.nomor_identitas,        "kadaluarsa_identitas": row.kadaluarsa_identitas,
            "nama_ibu_kandung": row.nama_ibu_kandung,        "alamat_instalasi": row.alamat_instalasi,
            "k_contact": row.k_contact,        "paket": row.paket,
            "nama_sales": row.nama_sales,        "nama_agency": row.nama_agency,
            "keterangan": row.keterangan,        "hasil_verifikasi": row.hasil_verifikasi,
            "detail_hasil_verifikasi": row.detail_hasil_verifikasi,        "nama_verificator": row.nama_verificator,
            "kelurahan": row.kelurahan,        "nomor_referensi": row.nomor_referensi,
            "odp_referensi": row.odp_referensi,        "latitude": row.latitude,
            "longitude": row.longitude,        "manja": row.manja,
            "nama_inputer": row.nama_inputer,        "nomor_sc": row.nomor_sc,
            "nomor_pots": row.nomor_pots,        "nomor_internet": row.nomor_internet,
            "keterangan_inputer": row.keterangan_inputer,        "status": row.status,
            "updatedAt": row.updatedAt
          });
        });
        $scope.csv_data = return2;
      });
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

    $scope.upload = uploadHander($scope, $state, Upload, $timeout);

    $scope.filter = function() {
      reset_query();
      for (var attrname in $scope.filters) {
        queryQuery[attrname] = $scope.filters[attrname];
      }

      querySales(queryQuery, 1);
      prepareCsvData();
    }

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
        $scope.sales.status = "Sudah Diinput";
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

	uploadHander = function ($scope, $state, Upload, $timeout) {
		return function(file, sales) {
			if (file && !file.$error) {
            sales.file = file;
				file.upload = Upload.upload({
					url: '/api/sales/'+sales._id+'/upload',
					file: file
				});

				file.upload.then(function (response) {
					$timeout(function () {
						// file.result = response.data;
            // alert(response);

            $state.reload();
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
