describe('TeamController', function() {

    var $scope, DataService, $rootScope, createController;

    beforeEach(inject(function($injector) {

        DataService = $injector.get('DataService');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        var $controller = $injector.get('$controller');

        createController = function() {
            return $controller('TeamController', {
                '$scope': $scope
            });
        };
    }));

    it('should have a method to check if the path is active', function() {
        var controller = createController();
        expect($scope.team).not.toBeUndefined();
    });
});




controllers.controller('TeamController', function($scope,$routeParams,DataService) {
    var teamId=parseInt($routeParams.teamId);
    DataService.getTeam(teamId).then(function(data) {
        $scope.team=data;
    });
});