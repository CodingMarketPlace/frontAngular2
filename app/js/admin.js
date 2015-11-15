var adminApp = angular.module('adminApp', []);

adminApp.controller('AdminController', function ($scope, $location, $routeParams, $http, $rootScope, $cookies) {
    
    $scope.UserManagement = function () {
      $location.path('/admin/user-management');
    };
    
});

