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

            $scope.alreadyApplied;
            $scope.developperChoose;

            $rootScope.isDevelopper = $cookies.get('user_Developper') === "true" ? true : false;

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
                var choice = {Id: $scope.projet.Id, UniqId: $scope.developperChoose};
                $http.post('http://codingmarketplace.apphb.com/api/Projects/Validate/' + $scope.IdCurrentUser, choice).success(function () {
                    $route.reload();
                });
            };

            $scope.FinishProject = function () {
                $http.post('http://codingmarketplace.apphb.com/api/Projects/Finish/' + $scope.projet.IdUser, $scope.projet.Id).success(function () {
                    $route.reload();
                });
            };


            function loadProjectDetail() {
                $http.get('http://codingmarketplace.apphb.com/api/Projects/Detail/' + $scope.IdProject).success(function (data) {
                    $scope.projet = data;
                    $scope.currentLeader = $scope.IdCurrentUser === $scope.projet.IdUser ? true : false;
                    $http.get('http://codingmarketplace.apphb.com/api/Projects/UsersApplied/' + $scope.IdProject).success(function (data) {
                        $scope.applicants = data;
                        angular.forEach($scope.applicants, function (value) {
                            if (value.UniqId === $scope.IdCurrentUser) {
                                $scope.alreadyApplied = true;
                            }
                        });
                    });
                    $http.get('http://codingmarketplace.apphb.com/api/Users/Detail/' + $scope.projet.IdUser).success(function (data) {
                        $scope.leaderProject = data;
                    });

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
