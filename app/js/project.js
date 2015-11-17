var projectApp = angular.module('projectApp', []);

projectApp.controller('ProjectController', function ($scope, $http, $routeParams, $rootScope, $cookies) {
    $scope.IdProject = $routeParams.projectId;
    
    $test = $cookies.get('loggedIn');
    $rootScope.loggedIn = ($test === "true");
    console.log($rootScope.loggedIn);
    
    $scope.projet = loadProjectDetail ();
    
    function loadProjectDetail() {
        $http.get('http://codingmarketplace.apphb.com/api/Projects/Detail/' + $scope.IdProject).success(function (data) {
           console.log('data : ' + data);
           $scope.projet = data;
        });
    }
});
