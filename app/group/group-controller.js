'use strict';

angular.module('chatApplicationApp.group', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/group/:groupName', {
    templateUrl: 'group/view.html',
    controller: 'groupCtrl'
  });
}])
.controller('groupCtrl', ['$scope', '$http', '$routeParams', 'UserList', function($scope, $http, $routeParams, UserList) {
	var promise = UserList.getUsers();
	promise.then(function(data){
		$scope.users = data.users;
		for (var i = 0; i <= $scope.users.length-1; i++) {
			if ($scope.users[i].groupName === $routeParams.groupName) {
				$scope.groupDetails = $scope.users[i];
				$scope.participants = $scope.groupDetails.participants;
			}
		}
	}).catch(function(error){
		console.log(error);
	});
	
}]);