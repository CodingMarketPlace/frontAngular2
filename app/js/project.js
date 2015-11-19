var projectApp = angular.module('projectApp', []);

projectApp.controller('ProjectController',
        function (
                $scope,
                $http,
                $routeParams,
                $rootScope,
                $cookies,
                $location,
                $route,
                $mdDialog)
        {
            $scope.IdProject = $routeParams.projectId;

            $scope.IdCurrentUser = $cookies.get('user_UniqId');

            $scope.currentLeader;

            $scope.applicants = {};
            $scope.leaderProject = {};
            $rootScope.loggedIn = $cookies.get('loggedIn') === "true" ? true : false;

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

            // Affichage pop-up de validation de projet 
            $scope.ValidateProjectDialog = function (ev) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'partials/dialog-validate-project.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                        .then(function (answer) {
                            $scope.status = 'You said the information was "' + answer + '".';
                        }, function () {
                            $scope.status = 'You cancelled the dialog.';
                        });
            };
            
            $scope.ValidateProject = function () {
                
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
            $scope.currentLeader = $scope.IdCurrentUser === $scope.leaderProject.Id ? true : false;
        }).error(function () {
            alert("Erreur du chargement des postulants au projet.");
        });
    }
});

// Controller pour l'ouverture des différentes pop-up
function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}
