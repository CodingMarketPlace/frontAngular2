var toolbarApp = angular.module('toolbarApp', []);

toolbarApp.config(function ($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

toolbarApp.controller('ToolbarCtrl', function ($scope, $mdDialog, $http) {
    $scope.status = '';

    $scope.user = {
        login: undefined,
        password: undefined,
        mail: undefined,
        firstname: undefined,
        lastname: undefined,
        verif_password: undefined,
        typeaccount: undefined,
        validated: undefined
    };



//    $scope.login = undefined;
//    $scope.password = undefined;
//    $scope.mail = undefined;
//    $scope.firstname = undefined;
//    $scope.lastname = undefined;
//    $scope.verif_password = undefined;
//    $scope.typeaccount = undefined;
//    $scope.validated = undefined;




/////////////////////////////
////Fonctions publiques//////
/////////////////////////////

    $scope.connection = function () {
        console.log('toto');
        var identification = {pass: $scope.user.password, login: $scope.user.mail};
        var res = $http.post('http://codingmarketplace.apphb.com/api/Users/Login', identification);
        res.success(function (data, status, headers, config) {
            $scope.user = data;
            console.log($scope.user);
        });
        res.error(function (data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
        });
    };


    $scope.showAlert = function (ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('This is an alert title')
                .content('You can specify some description text in here.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
                );
    };

    //pop-up de connexion 
    $scope.showDialogConnect = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'partials/dialog-connect.tmpl.html',
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

    //pop-up d'inscription
    $scope.showDialogInscription = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'partials/dialog-inscription.tmpl.html',
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

    //pop-up de création de projet 
    $scope.showDialogProjectCreate = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'partials/dialog-creation-project.tmpl.html',
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
