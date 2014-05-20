var dataServices = angular.module('SoccerCoachPlanner.Services',[]);

dataServices.factory('DataService', function($http) {

	var dataService={};
	var token;
	var formation, team;

	var teams= [
		{
			teamName: 'Pink Flamingoes',
			teamId: 1
		},
		{
			teamName: 'Purple Puppies',
			teamId: 2
		},
		{
			teamName: 'Blue Dolphins',
			teamId: 3
		}
	];

	dataService.saveTeam=function(team) {
		team.teamId=teams[teams.length-1].teamId + 1;
		teams.push(team);
	}

	dataService.setToken=function(securityToken) {
		token=securityToken;
	};
	
	dataService.getTeams=function() {
		return $http.get('/api/teams');
		/*
		return $http.get('/api/teams').then(function (response) {
	        return response.data;
	    },function(error) {
	    	console.log(error);
	    });
		*/
	};

	dataService.getTeam=function(teamId) {
		/*
		if(team && team.teamId===teamId) {
			return team;
		}
		*/
		var promise = $http.get('/api/teams/' + teamId).then(function (response) {
	        return response.data;
	    },function(error) {
	    	console.log(error);
	    });
	    return promise;

		/*
		team = {
			coachId: 1,
			teamId: 1,
			teamName: 'Blue Dolphins',
			ageGroup: 'U-10',
			season: 'Spring 2014',
			players: [
				{
					name: 'Sally',
					number: 8,
					id: 1
				},
				{
					name: 'Amy',
					number: 9,
					id: 2
				},
				{
					name: 'Meghan',
					number: 10,
					id: 3
				}
			],
			rules: {
				numPlayersOnField: 7,
				maxQtrsOnBench: 1,
				maxQtrsInGoal: 2,
				minQtrsOnField: 2
			},
			games: [
				{
					date: '3/29/2014',
					id: 2
				},
				{
					date: '3/22/2014',
					id: 1
				}
			]
		};
		return team;
		*/
	};

	//all games for coach regardless of team
	//limit -- most reaching n games in reverse chronological order
	dataService.getAllGames=function(limit) {
		return [
			{
				teamName: 'Blue Dolphins',
				date: '3/29/2014',
				gameId: 2,
				teamId: 3
			},
			{
				teamName: 'Purple Puppies',
				date: '3/22/2014',
				gameId: 1,
				teamId: 2
			}
		];
	};

	dataService.getGame=function(team,gameId) {
		var game = {
			id: 1,
			date: '22/3/14',
			unavailablePlayers: [1],
			formationId: 1,
			first: [
				{
					playerId: 1,
					positionId: 1
				},
				{
					playerId: 2,
					positionId: 2
				},
				{
					positionId: 3
				}
			],
			second: [],
			third: [],
			fourth: []
		}
		var formation = getFormation(game.formationId);
		populateAssginments(game.first,formation.positions,team.players);
		populateAssginments(game.second,formation.positions,team.players);
		populateAssginments(game.third,formation.positions,team.players);
		populateAssginments(game.fourth,formation.positions,team.players);
		populateUnavailablePlayers(game.unavailablePlayers,team.players);
		return game;
	};

	function populateUnavailablePlayers(unavailable,players) {
		for(var i=0,len=unavailable.length;i<len;i++) {
			unavailable[i]=getPlayer(players,unavailable[i]);
		}
	}

	function populateAssginments(assignments,positions,players) {
		var numAssignments=assignments.length;
		for(var assignmentIndex=0;assignmentIndex<numAssignments;assignmentIndex++) {
			var assignment = assignments[assignmentIndex];
			if(assignment.playerId) {
				assignment.player=getPlayer(players,assignment.playerId);
			}
			assignment.position=getPosition(positions,assignment.positionId);
		}
	}

	function getPlayer(players,playerId) {
		var player = getArrayElementFromId(players,playerId);
		if(player) {
			return player;
		}
		throw "Player not found."
	}

	function getPosition(positions,positionId) {
		var position = getArrayElementFromId(positions,positionId);
		if(position) {
			return position;
		}
		throw "Position not found."
	}

	function getArrayElementFromId(array,id, idField) {
		idField=idField||'id';
		var length=array.length;
		for(var index=0;index<length;index++) {
			if(array[index][idField]===id) {
				return array[index];
			}
		}
	}

	dataService.getFormations=function(numPlayers) {
		return [
			{
				name: '3-2-1',
				id: 1
			},
			{
				name: '3-3',
				id: 2
			}
		];
	};

	function getFormation(formationId) {
		if(formation && formation.id===formationId) {
			return formation;
		}
		formation = {
			id: 1,
			name: '3-2-1',
			numberOnField: 7,
			positions: [
				{
					id: 1,
					name: 'Goal Keeper',
					abbreviation: 'GK'
				},
				{
					id: 2,
					name: 'Center Back',
					abbreviation: 'CB'
				},
				{
					id: 3,
					name: 'Left Back',
					abbreviation: 'LB'
				},
				{
					id: 4,
					name: 'Right Back',
					abbreviation: 'RB'
				},
				{
					id: 5,
					name: 'Left Midfield',
					abbreviation: 'LM'
				},
				{
					id: 6,
					name: 'Right Midfield',
					abbreviation: 'RM'
				},
				{
					id: 7,
					name: 'Forward',
					abbreviation: 'F'
				}
			]
		}
		return formation;
	};

	return dataService;
});

dataServices.factory('AuthService', function() {
	var AuthService={};

	var uName='downeyj@gmail.com';
	var pwd='test';
	var authenticated=true;

	AuthService.logIn = function(userName, password, callback) {
		if(userName===userName&&password===pwd) {
			authenticated=true;
			callback('token');
			return true;
		} else {
			return false;
		}
	}

	AuthService.isAuthenticated = function() {
		return authenticated;
	}

	return AuthService;
});





