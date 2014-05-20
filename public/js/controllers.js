/*
teams and allGames stored in $rootScope for display in menu
*/

var controllers = angular.module('SoccerCoachPlanner.Controllers',['SoccerCoachPlanner.Services']);

controllers.controller('HomeController', function($scope) { });

controllers.controller('TeamsController', function($scope,$rootScope,$location,DataService) {
	DataService.getTeams().then(function(data) {
		$rootScope.teams=data;
	});
	$scope.addTeam = function() { $location.path('/team'); };
});

controllers.controller('TeamController', function($scope,$routeParams,DataService) {
	var teamId=parseInt($routeParams.teamId);
	DataService.getTeam(teamId).then(function(data) {
		$scope.team=data;
	});
});

controllers.controller('AddTeamController', function($scope,$location,DataService) {
	$scope.team={};
	$scope.team.rules={};
	$scope.saveTeam = function() {
		DataService.saveTeam($scope.team);
		$location.path('/teams');
	};
	$scope.cancel = function() { $location.path('/teams'); };
});

controllers.controller('GameController', function($scope,$routeParams,DataService) { 
	var gameId=parseInt($routeParams.gameId);
	var teamId=parseInt($routeParams.teamId);
	$scope.team=DataService.getTeam(teamId);
	$scope.game=DataService.getGame($scope.team,gameId);
});

controllers.controller('LoginController', function($scope,$location,$rootScope,AuthService,DataService) { 
	$scope.user = {userName: 'downeyj@gmail.com', password: 'test'};
	$scope.message = '';
	$scope.submit = function () {
		if(AuthService.logIn($scope.user.userName, $scope.user.password, DataService.setToken))
		{
			DataService.getTeams().then(function(data) {
				$rootScope.teams=data;
			});
			$rootScope.allGames=DataService.getAllGames();
			$location.path('/teams');
		} else {
			$scope.message = 'Error: Invalid user or password';
		}
	};
});

