(function(window){

  'use strict';

  window.App = angular.module('OWMApp', ['ngRoute']);

  window.App.value('owmCities', ['New York', 'Houston', 'Chicago']);

  window.App.config(function($routeProvider){
    $routeProvider.when('/', {
      templateUrl: '/views/home.html',
      controller: 'homeCtrl as home'
    })
    .when('/cities/:city', {
      templateUrl: '/views/city.html',
      controller: 'cityCtrl as city',
      resolve: {
        city: function(owmCities, $route, $location){
          var city = $route.current.params.city;
            if(owmCities.indexOf(city) === -1 ) {
                $location.path('/error');
                return;
            }
            return city;
        }
      }
    })
    .when('/error', {
      template: '<p>Error Page</p>'
    })
    .otherwise({
        redirectTo : '/error'
    });
  });

  window.App.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path('/error');
    });
  });

}(window));
