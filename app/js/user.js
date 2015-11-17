var userApp = angular.module('userApp', []);

userApp.controller('UserController', function ($scope, $mdDialog, $http, $routeParams, $rootScope, $cookies) {
    
    $scope.loadUserDetail = function() {
        $http.get('http://codingmarketplace.apphb.com/api/Users/Detail/' + $routeParams.userId).success(function (data) {
            $scope.user = data;
        }).then(
                // A finaliser avec Baptiste pour l'api
                );
    };

    $scope.showDialogContact = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'partials/dialog-contact.tmpl.html',
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
    
    $scope.loadUserDetail();

    $test = $cookies.get('loggedIn');
    $rootScope.loggedIn = ($test === "true");
    console.log($rootScope.loggedIn);

    $scope.currentProjects = undefined;
    $scope.completedProjects = undefined;

});

//Controller pour l'ouverture des différentes pop-up
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