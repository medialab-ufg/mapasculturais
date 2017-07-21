var fva = angular.module("ng.fva", ['ngRoute']);

/*fva.controller("rootController", function($scope, $route, $routeParams, $location) {
    console.log($location.host());
});*/

fva.controller('rootController', function($scope) {
    console.log('foii');
});    

fva.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/red', {
        templateUrl : 'http://mapa.fdev/assets/html/tmpTeste.html'
    }).otherwise({template: '<h1>template base</h1>'});

    /*$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });*/
});

/*angular.element(document).ready(function() {
  angular.bootstrap(document.getElementById("fva-survey"), ["fva"]);
});   */
//angular.element(document).ready(function() { angular.bootstrap(document.getElementById("fvm-survey"), ['fvm']); })
//angular.bootstrap(document.getElementById("fvm-survey"), ['fvm']);