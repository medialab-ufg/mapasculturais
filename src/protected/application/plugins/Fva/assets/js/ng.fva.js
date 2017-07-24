"use strict";

var fva = angular.module("ng.fva", ['ngRoute', 'ngAnimate']);

fva.controller("rootController", function($scope, $route, $routeParams, $location) {
    console.log($location.host());
    console.log($location.path());

    $location.search({});
});

fva.config(function($routeProvider, $locationProvider){
    let pluginTemplatePath = '/protected/application/plugins/Fva/assets/partials';

    $routeProvider
    .when('/inicio', {
        templateUrl : pluginTemplatePath + '/index.html'
    })
    .when('/pag2', {
        templateUrl : pluginTemplatePath + '/pag2.html'
    })
    .when('/pag3', {
        templateUrl : pluginTemplatePath + '/pag3.html'
    })
    .otherwise({templateUrl: pluginTemplatePath + '/index.html'});

    /*$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });*/
});