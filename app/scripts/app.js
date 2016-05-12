'use strict';

/**
 * @ngdoc overview
 * @name chatApplicationApp
 * @description
 * # chatApplicationApp
 *
 * Main module of the application.
 */
var chatApplicationApp = angular
  .module('chatApplicationApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'chatApplicationApp.dashboard',
    'chatApplicationApp.profile',
    'chatApplicationApp.group'
  ]);

  chatApplicationApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/dashboard'});
  }]);

  chatApplicationApp.service('UserList', ['$http', '$q', function($http, $q){
    var deferred = $q.defer();
    this.getUsers = function(){
      $http.get('data/users.json')
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(data,status,error,config){
          deferred.reject(error);
      });
      return deferred.promise;
    };
  }]);

  chatApplicationApp.directive('displayUserList',['UserList', function(UserList) {
      return {
        restrict : 'EA',
        templateUrl :  'partials/user-list.html',
        scope : {
          list : '='
        }
      }
  }]);

  chatApplicationApp.filter('birthdayReminder',[function() {
    return function(input) {
      var dob = new Date(input);
      var today = new Date();
      if (dob.getDate() === today.getDate()) {
        return "Today is his Birthday"
      }
    };
}])