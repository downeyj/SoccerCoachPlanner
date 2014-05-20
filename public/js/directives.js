var directives = angular.module('SoccerCoachPlanner.Directives',[]);

directives.directive('menu', function($rootScope) {
  return { 
    restrict: 'A',
    replace: true,
    templateUrl: 'views/directive_views/menu.html',
    link: function(scope, element, attrs) {
      scope.teams = $rootScope.teams,
      scope.allGames = $rootScope.allGames
    }
  }
});

directives.directive('banner', function() {
  return { 
    restrict: 'A',
    replace: true,
    templateUrl: 'views/directive_views/banner.html',
  }
});

directives.directive('teamInfo', function() {
  return { 
    restrict: 'A',
    replace: true,
    templateUrl: 'views/directive_views/team_info.html',
  }
});

directives.directive('players', function() {
  return { 
    restrict: 'A',
    replace: true,
    templateUrl: 'views/directive_views/players.html',
  }
});

directives.directive('games', function() {
  return { 
    restrict: 'A',
    replace: true,
    templateUrl: 'views/directive_views/games.html',
  }
});

directives.directive('quarter', function() {
  return { 
    restrict: 'A',
    replace: true,
    templateUrl: 'views/directive_views/quarter.html',
    scope: true,
    link: function(scope, element, attrs) {
      scope.quarter = attrs.quarter;
      scope.quarterTitle = attrs.quarter.charAt(0).toUpperCase() + attrs.quarter.slice(1);
    }
  }
});

directives.directive('unavailable', function() {
  return { 
    restrict: 'A',
    replace: true,
    templateUrl: 'views/directive_views/unavailable.html',
  }
});
