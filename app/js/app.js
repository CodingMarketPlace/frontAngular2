'use strict';

/* App Module */

var codingMarketPlaceApp = angular.module('CodingMarketPlaceApp', [
    'ngRoute',
    'ngMaterial',
    'toolbarApp',
    'projectsApp',
    'projectApp',
    'userApp'
]);

codingMarketPlaceApp.config(function ($routeProvider) {
    $routeProvider.
            when('/', {
                templateUrl: 'partials/template-index.html',
                controller: ''
            }).
            when('/projects', {
                templateUrl: 'partials/template-projects.html',
                controller: 'ProjectsController'
            }).
            when('/projects/:projectId', {
                templateUrl: 'partials/template-detail-project.html',
                controller: 'ProjectController'
            }).
            when('/legal-notice', {
                templateUrl: 'partials/legal-notice.html',
                controller: ''
            }).
            when('/user/:userId', {
                templateUrl: 'partials/template-detail-user.html',
                controller: 'UserController'
            }).
            otherwise({
                redirectTo: '/'
            });
});



/////////////////////////////
////////Propriétés///////////
/////////////////////////////