var projectsApp = angular.module('projectsApp', []);


projectsApp.controller('ProjectsController', function ($scope, $routeParams, $http, $rootScope, $cookies) {
    $scope.searchText = $routeParams.key || '';

    $test = $cookies.get('loggedIn');
    $rootScope.loggedIn = ($test === "true");
    console.log($rootScope.loggedIn);

    $scope.projects = loadProjects();

    console.log("root : " + $rootScope.loggedIn);
    function loadProjects() {
        $http.get('http://codingmarketplace.apphb.com/api/Projects/All/' + $scope.searchText).success(function (data) {
            console.log(data);
            $scope.projects = data;
            console.log($scope.projects);
            console.log("rootScope : " + $rootScope.loggedIn);
        });
    }

});