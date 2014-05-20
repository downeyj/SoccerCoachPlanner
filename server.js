var express  = require('express');
var app      = express(); 								

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 	
	app.use(express.logger('dev')); 				
});

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


//get all teams for a coach
app.get('/api/teams', function(req, res) {
	res.json(teams);
});

//get a team
app.get('/api/teams/:teamId', function(req, res) {
	var teamId=req.params.teamId;
	var team = {
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
	res.json(team);
});

//create a team
app.post('/api/teams', function(req, res) {
	teams.push(req.body);
});

//update a team
app.post('/api/teams/:teamId', function(req, res) {});

app.delete('/api/teams/:teamId', function(req, res) {});

app.listen(8080);

console.log("App listening on port 8080");