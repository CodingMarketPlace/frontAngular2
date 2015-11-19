var userApp = angular.module('userApp', []);

userApp.controller('UserController', function ($scope, $mdDialog, $http, $routeParams, $rootScope, $cookies, $mdMedia) {

    $scope.myAccount = false;

    $scope.IdUserConnected = $cookies.get('user_UniqId');

    $scope.password = '';
    $scope.verif_password = '';

    $scope.screenSmall = $mdMedia('sm');

    $scope.isDisabled = ($scope.IdUserConnected === $routeParams.userId) ? false : true;
    console.log('disabled' + $scope.isDisabled);
    $scope.loadUserDetail = function () {
        $http.get('http://codingmarketplace.apphb.com/api/Users/Detail/' + $routeParams.userId).success(function (data) {
                console.log("test                        : " + $scope.myAccount);
            $scope.user = data;
            console.log('user detail : ' + $scope.user.UniqId);
            console.log('coucou: ' + ($scope.IdUserConnected === $routeParams.userId));
            console.log('conn : ' + $scope.IdUserConnected + '     compte : ' + $routeParams.userId);
            console.log('user description : ' + $scope.user.Description);
            if ($scope.IdUserConnected === $routeParams.userId)
            {
                console.log("test                        : " + $scope.myAccount);
                $scope.myAccount = true;
            }
        });
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
    
    $scope.showAlert = function() {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
        alert('Vos modifications ont bien été enregistrées..');
  };

    $scope.saveModification = function () {
        if ($scope.password === $scope.verif_password) {
            var user_modificated = {Id: $scope.user.Id, Email: $scope.user.Email, Password: $scope.password, Description: $scope.user.Description};
            $http.post('http://localhost:57396/api/Users/Update/' + $scope.user.UniqId, user_modificated).success(function (data) {
               $scope.showAlert();
            });
        }
    };

    $scope.resetPassword = function () {
        if ($scope.password === $scope.verif_password) {
            id = $routeParams.userId;
            var reset_password = {Id: 0, Password: $scope.password, UniqId: id};
            $http.post('http://localhost:57396/api/Users/Update/' + id, reset_password).success(function (data) {
                alert("Mot de passe changé !");
             });
        }
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