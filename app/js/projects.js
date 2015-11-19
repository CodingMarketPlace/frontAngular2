var projectsApp = angular.module('projectsApp', []);


projectsApp.controller('ProjectsController', function ($scope, $routeParams, $http, $rootScope, $cookies) {
    $scope.searchText = $routeParams.key || '';

    $test = $cookies.get('loggedIn');
    $scope.countProjects = 0;
    $scope.user = {};
    $rootScope.loggedIn = ($test === "true");

    $scope.projects = loadProjects();

    function loadProjects() {
        $http.get('http://codingmarketplace.apphb.com/api/Projects/All/' + $scope.searchText).success(function (data) {
            $scope.projects = data;
            $scope.countProjects = $scope.projects.length || $scope.countProjects;
            angular.forEach($scope.projects, function (projet) {
                $http.get('http://codingmarketplace.apphb.com/api/Users/Detail/' + projet.IdUser).success(function (data) {
                   projet.userName = data.FirstName + ' ' + data.LastName;
                });
            });
        });
    }
});