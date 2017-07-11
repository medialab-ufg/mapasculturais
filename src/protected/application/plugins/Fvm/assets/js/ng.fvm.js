var fvm = angular.module("fvm", ['ngRoute']);

fvm.controller("RootController", function($scope, $route, $routeParams, $location) {
    console.log($location.host());
});

fvm.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/red', {
        templateUrl : 'http://mapa.fdev/assets/html/tmpTeste.html'
    }).otherwise({template: '<h1>template base</h1>'});

    /*$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });*/
});

angular.element(document).ready(function() {
  angular.bootstrap(document.getElementById("fvm-survey"), ["fvm"]);
});   
//angular.element(document).ready(function() { angular.bootstrap(document.getElementById("fvm-survey"), ['fvm']); })
//angular.bootstrap(document.getElementById("fvm-survey"), ['fvm']);