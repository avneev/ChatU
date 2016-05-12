'use strict';

angular.module('chatApplicationApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/view.html',
    controller: 'dashboardCtrl'
  });
}])

.controller('dashboardCtrl', ['$scope', '$http', '$routeParams', 'UserList', function($scope, $http, $routeParams, UserList) {
	var promise = UserList.getUsers();
	promise.then(function(data){
		$scope.users = data.users;
	}).catch(function(error){
		console.error(error)
	});
}]);
