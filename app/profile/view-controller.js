'use strict';

angular.module('chatApplicationApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile/:username', {
    templateUrl: 'profile/view.html',
    controller: 'profileCtrl'
  });
}])
.controller('profileCtrl', ['$scope', '$http', '$routeParams', 'UserList', function($scope, $http, $routeParams, UserList) {
	var promise = UserList.getUsers();
	promise.then(function(data){
		$scope.users = data.users;
		for (var i = 0; i < $scope.users.length; i++) {
			if ($routeParams.username === $scope.users[i].username) {
				$scope.userDetails = $scope.users[i];
			}			
		}
		var today = new Date();
		var birthDate = new Date($scope.userDetails.dob);
		$scope.age = today.getFullYear() - birthDate.getFullYear();
		var month = today.getMonth() - birthDate.getMonth();
		if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())){
			$scope.age--;
		}
	}).catch(function(error){
		console.log(error);
	});
	
}]);