var userApp = angular.module('userApp', []);

userApp.controller('UserController', function ($scope) {
    $scope.user = {
        firstName: 'Romain',
        lastName: 'POUSSIN',
        login: 'RomainPoussin',
        email: 'romain.poussin@ynov.com',
        image: 'img/romainPoussin.png',
        description: 'Je suis un freelance depuis deux ans.'
    };
});