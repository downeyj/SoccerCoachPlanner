var app = angular.module('SoccerCoachPlanner',['ngRoute','SoccerCoachPlanner.Controllers','SoccerCoachPlanner.Directives','SoccerCoachPlanner.Services']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/routing_views/login.html',
    }).
    when('/teams', {
      templateUrl: 'views/routing_views/teams.html',
      controller: 'TeamsController'
    }).
    when('/team/:teamId', {
      templateUrl: 'views/routing_views/team.html',
      controller: 'TeamController'
    }).
    when('/team/:teamId/game/:gameId', {
      templateUrl: 'views/routing_views/game.html',
      controller: 'GameController'
    }).
    when('/team', {
      templateUrl: 'views/routing_views/add_team.html',
      controller: 'AddTeamController'
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);

app.run(['$rootScope', '$location', 'AuthService', function ($rootScope, $location, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event) {
    if (!AuthService.isAuthenticated()) {
      event.preventDefault();
      $location.path('/login');
    }
  });
}]);
