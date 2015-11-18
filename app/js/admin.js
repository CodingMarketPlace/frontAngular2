var adminApp = angular.module('adminApp', []);

adminApp.controller('AdminController', function ($scope, $location, $routeParams, $http, $rootScope, $cookies, $route) {
    
    $scope.UserManagement = function () {
      $location.path('/admin/user-management');
    };

    $scope.loadUsersData = function() {
    	$http.get('http://codingmarketplace.apphb.com/api/Users/All').success(function (data) {
            $scope.users = data;
            console.log($scope.users);
        });
        if ($rootScope.loggedIn === false) {
        	$location.path('#/');
        }
    };

    $test = $cookies.get('loggedIn');
    $rootScope.loggedIn = ($test === "true");
    console.log($rootScope.loggedIn);

    $scope.loadUsersData();

    $scope.adminId = "525113112015140402";

    $scope.deleteUser = function(id) {
    	console.log('http://codingmarketplace.apphb.com/api/Users/Delete/' + $scope.adminId);
    	console.log('body: userId = ' + id);

    	var userToDelete = {UniqId: id};
    	var identification = {password: "test", login: "test"};

		$http({ url: 'http://codingmarketplace.apphb.com/api/Users/Delete/' + $scope.adminId, 
                method: 'DELETE', 
                data: userToDelete, 
                headers: {"Content-Type": "application/json;charset=utf-8"}
        }).success(function(res) {
        	$route.reload();
        }, function(error) {
            console.log(error);
        });
    };
    
});

