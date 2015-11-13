var userApp = angular.module('userApp', []);

userApp.controller('UserController', function ($scope, $mdDialog) {
    $scope.user = {
        firstName: 'Romain',
        lastName: 'POUSSIN',
        login: 'Romain_Poussin',
        email: 'romain.poussin@ynov.com',
        image: 'img/romainPoussin.png',
        description: 'Je suis un freelance depuis deux ans.'
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