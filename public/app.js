var expressAngular = angular.module('expressAngular', []);

function mainController($scope, $http) {
	$scope.loading = false;
	$scope.status = "";
	
	// send form data
	$scope.contactSend = function() {
		$scope.loading = true;
		$http.post('/api/contact', {form_data:this.data}).
		success(function(data, status, headers, config) {
			$scope.loading = false;
			$scope.status = data.status;
			$scope.status_class = "bg-info";
			loadContacts();
		}).
		error(function(data, status, headers, config) {
		    $scope.loading = false;
		    $scope.status = "Error - " + data;
		    $scope.status_class = "bg-danger";
		});
	};


	loadContacts = function() {
		$http.get('/api/contacts').
		success(function(data, status, headers, config) {
			console.log(data);
		}).
		error(function(data, status, headers, config) {

		});
	};

}
