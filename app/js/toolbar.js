var toolbarApp = angular.module('toolbarApp', []);

toolbarApp.config(function ($httpProvider, $cookiesProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

toolbarApp.controller('ToolbarCtrl', function ($scope, $rootScope, $mdDialog, $http, $location, $cookies) {
    $scope.status = '';

    $rootScope.loggedIn = $cookies.get('loggedIn') || false;
    $scope.searchText = '';
    $scope.erreur = false;

    $scope.user = $cookies.get('user') || {
        Login: undefined,
        Password: undefined,
        Email: undefined,
        FirstName: undefined,
        LastName: undefined,
        verif_password: undefined,
        Developper: undefined,
        Activated: undefined,
        Admin: undefined,
        Description: undefined,
        Id: undefined,
        ImageUrl: undefined,
        ProjectCreator: undefined,
        UniqId: undefined
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
        var identification = {password: $scope.user.password, login: $scope.user.mail};
        $http.post('http://codingmarketplace.apphb.com/api/Users/Login', identification).success(function (data) {
            $scope.user = data;
            console.log("data : " + data);
            console.log("user : " + $scope.user);
            console.log("user.login : " + $scope.user['Login']);
            $rootScope.loggedIn = true;
            $cookies.put('loggedIn', $rootScope.loggedIn);
            $cookies.put('user', $scope.user);
            console.log("cookie loggedIn : " + $cookies.get('loggedIn'));
            console.log("cookie user : " + $cookies.get('user'));
            $scope.hide();
        }).error(function (data) {
            $scope.erreur = true;
            console.log("failure message: " + JSON.stringify({data: data}));
        });
    };

    $scope.logOut = function () {
        $rootScope.loggedIn = false;
        $scope.user = undefined;
        console.log($rootScope.loggedIn);
        $cookies.put('loggedIn', $rootScope.loggedIn);
        $cookies.put('user', $scope.user);
    };

    $scope.search = function () {
        console.log('scope : ' + $scope.searchText);
        console.log($location.path());
        $location.path('search-projects/' + $scope.searchText);
        console.log($location.path());
    };

    $scope.myAccount = function () {
        $location.path('user/' + $scope.user.Id);
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
