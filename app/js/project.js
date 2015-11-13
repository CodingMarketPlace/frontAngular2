var projectApp = angular.module('projectApp', []);

projectApp.controller('ProjectController', function ($scope) {
    $scope.projet = {
        name: 'projet de test',
        leader: 'POUSSIN Romain',
        delay: '150',
        budget: '12500',
        image: 'img/arton.jpg',
        description: 'Ce projet a pour but de réaliser un site Web mettant en relation des porteurs de projet et des développeurs Freelance pour leur réalisation',
        id: 14
    };
});
