var projectsApp = angular.module('projectsApp', []);


projectsApp.controller('ProjectsController', function ($scope) {
    $scope.projects = [
        {
            'id': 15,
            'name': 'premier projet',
            'leader': 'Jean Jacques',
            'description': 'JeSGq gggggggggggggggggggggggggggggg gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggfaire',
            'delay': '3 semaines',
            'budget': 0,
            'image': 'img/arton.jpg'
        },
        {
            'id': 15,
            'name': 'premier projet',
            'leader': 'Jean Jacques',
            'description': 'Je sais pas quoi faire',
            'delay': '3 semaines',
            'budget': 0,
            'image': 'img/arton.jpg'
        },
        {
            'id': 15,
            'name': 'premier projet',
            'leader': 'Jean Jacques',
            'description': 'Je sais pas quoi faire',
            'delay': '3 semaines',
            'budget': 0,
            'image': 'img/arton.jpg'
        }
    ];
});