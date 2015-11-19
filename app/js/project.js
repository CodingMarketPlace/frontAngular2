var projectApp = angular.module('projectApp', []);

projectApp.controller('ProjectController', function ($scope, $http, $routeParams, $rootScope, $cookies, $location, $route) {
    $scope.IdProject = $routeParams.projectId;

    $scope.IdCurrentUser = $cookies.get('user_UniqId');

    $scope.applicants = {};
    $scope.leaderProject = {};
    $test = $cookies.get('loggedIn');
    $rootScope.loggedIn = ($test === "true");

    $scope.projet = loadProjectDetail();

    $scope.showLeaderDetail = function () {
        $location.path('user/' + $scope.projet.IdUser);
    };

    $scope.ApplyProject = function () {
        $http.post('http://codingmarketplace.apphb.com/api/Projects/Apply/' + $scope.IdCurrentUser, $scope.projet.Id).success(function () {
            $route.reload();
        }).error(function () {
            alert("Une erreur est survenue...");
        });
    };

    function loadProjectDetail() {
        $http.get('http://codingmarketplace.apphb.com/api/Projects/Detail/' + $scope.IdProject).success(function (data) {
            $scope.projet = data;
            $http.get('http://codingmarketplace.apphb.com/api/Projects/UsersApplied/' + $scope.IdProject).success(function (data) {
                $scope.applicants = data;
            });
            $http.get('http://codingmarketplace.apphb.com/api/Users/Detail/' + $scope.projet.IdUser).success(function (data) {
                $scope.leaderProject = data;
            });
        }).error(function () {
            alert("Erreur du chargement des postulants au projet.");
        });
    }
});
