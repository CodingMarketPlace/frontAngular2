var projectsApp = angular.module('projectsApp', []);


projectsApp.controller('ProjectsController', function ($scope, $routeParams, $http, $rootScope, $cookies) {
    $scope.searchText = $routeParams.key;
    
    $rootScope.loggedIn = $cookies.get('loggedIn') || false;
    
    $scope.projects = loadProjects();
    
    console.log("root : " + $rootScope.loggedIn);
    function loadProjects() {
        $http.get('http://codingmarketplace.apphb.com/api/Projects/All').success(function (data) {
            console.log(data);
           $scope.projects = data;
           console.log($scope.projects);
           console.log("rootScope : " + $rootScope.loggedIn);
        });
    }
    
});