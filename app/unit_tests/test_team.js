describe("Test team.js", function() {

	//injection
 	var $controller;
	beforeEach(function(){
      module('teamform-team-app');
      inject(function(_$controller_){
          $controller=_$controller_;
	  });
	
	});
	
    
    describe("Test functions in team.js", function(){
        var $scope, controller;
		//$scope = {};
	//	beforeEach(function() {
		   $scope = {};
	//	   module('Simplift', 'firebase');
	//	});
		
		it("Load", function() {	 
			
			controller = $controller('TeamCtrl', {$scope: $scope});
			$scope.loadFunc();
		});
		
		it("Change team size", function() {//inject(function ($firebase) {	 
			//fireSync = $firebase(new Firebase('https://team-long-time-no-name.firebaseio.com'));
			$scope.loadFunc();
			var eventName = getURLParameter("q");
			var refPath = "events/" + eventName + "/admin";
			retrieveOnceFirebase(firebase, refPath);
			$scope.changeCurrentTeamSize(5);
		});
	
		it("Testing saving function without team defined", function() {	 
			
			$scope.saveFunc();
		});
		
		it("Testing saving function once team is defined", function() {	 
			$scope.param.teamName = "TeamExistent";
			$scope.saveFunc();
		});
		
			
		it("Testing add leader given defined teamMembers list containing the to-be-leader", function() {	
			//$scope.auth.$onAuthStateChanged(firebaseUser);
			//$scope.processRequest("23882U23uJHF83jEE");
			
			$scope.param.teamName = "";
			$scope.saveFunc();
			$scope.param.teamMembers = ["IWantToBeLeader","IJustChill"];
			$scope.addLeader("IWantToBeLeader");
			$scope.saveFunc();
			expect($scope.param.teamLeaders).toContain("IWantToBeLeader");
			expect($scope.param.teamLeaders).not.toContain("IJustChill");
		});
		
		it("Testing add leader given defined teamMembers list without the to-be-leader", function() {	

			$scope.param.teamMembers = ["IWantToBeLeader","IJustChill"];
			$scope.addLeader("Anonymous");
			$scope.saveFunc();
			expect($scope.param.teamLeaders).not.toContain("Anonymous");
		});
		
		it("Testing remove member given defined teamMembers list", function() {	
			$scope.param.teamMembers = ["MemberOne"];
			$scope.removeMember("MemberOne");
			$scope.saveFunc();
			expect($scope.param.teamLeaders).not.toContain("MemberOne");
		});
		
		it("Testing remove member given defined teamMembers list without the member to be removed", function() {	
			$scope.param.teamMembers = ["MemberOne", "MemberTwo"];
			$scope.removeMember("MemberZero");
			$scope.saveFunc();
			expect($scope.param.teamLeaders).not.toContain("MemberOne");
		});
		
		it("Testing process new member if the team still has space and member is new", function() {
			
			//event defined team size = (2, 10)
			//$scope.range.minTeamSize = 2;
			//$scope.range.maxTeamSize = 10;

			$scope.param.currentTeamSize = 8;
			$scope.param.teamMembers = ["MemberOne", "MemberTwo",  "MemberThree",  "MemberFour"];
			$scope.processRequest("MemberZero");
			$scope.saveFunc();
			expect($scope.param.teamMembers).toContain("MemberZero");
		});
			
			
		it("Testing process new member if the team still has space but member already exists", function() {
			
			//event defined team size = (2, 10)
			//$scope.range.minTeamSize = 2;
			//$scope.range.maxTeamSize = 10;

			$scope.param.currentTeamSize = 10;
			$scope.param.currentTeamLeaderSize = 1;
			$scope.param.teamMembers = ["MemberOne", "MemberTwo",  "MemberThree",  "MemberFour", "MemberFive"];
			$scope.param.teamLeaders = ["Leader"];
			$scope.processRequest("MemberThree");
			$scope.saveFunc();
			expect($scope.param.teamMembers).toContain("MemberThree");
		});
		
		it("Testing process new member if the team does not have space", function() {
			
			//event defined team size = (2, 10)
			//$scope.range.minTeamSize = 2;
			//$scope.range.maxTeamSize = 10;

			$scope.param.currentTeamSize = 6;
			$scope.param.currentTeamLeaderSize = 1;
			$scope.param.teamMembers = ["MemberOne", "MemberTwo",  "MemberThree",  "MemberFour", "MemberFive"];
			$scope.param.teamLeaders = ["Leader"];
			$scope.processRequest("NewMember");
			$scope.saveFunc();
			expect($scope.param.teamMembers).not.toContain("NewMember");
		});
			
		it("Testing refreshViewRequestsReceived()", function() {
			$scope.refreshViewRequestsReceived();
		});
		
		it("Testing remove leader if leader exists", function() {
			$scope.param.currentTeamLeaderSize = 2;
			$scope.param.teamLeaders = ["RemoveMe", "DontRemoveMe"];
			$scope.removeLeader("RemoveMe");
			$scope.saveFunc();
			expect($scope.param.teamLeaders).toEqual(["DontRemoveMe"]);
			expect($scope.param.currentTeamLeaderSize).toEqual(1);
		});
		
		it("Testing remove leader if leader doesn't exist", function() {
			$scope.param.currentTeamLeaderSize = 3;
			$scope.param.teamLeaders = ["DoYouDareToRemoveMe", "DontRemoveMe", "DoYouDareToRemoveMeEither"];
			$scope.removeLeader("IDontExist");
			$scope.saveFunc();
			expect($scope.param.teamLeaders).toEqual(["DoYouDareToRemoveMe", "DontRemoveMe", "DoYouDareToRemoveMeEither"]);
			expect($scope.param.currentTeamLeaderSize).toEqual(3);
		});
		
		it("Testing change leader if both leader and member exists", function() {
			$scope.param.currentTeamSize = 1000;
			$scope.param.teamMembers = ["MemberOne", "MemberTwo",  "MemberThree",  "MemberFour", "MemberFive"];
			$scope.param.currentTeamLeaderSize = 2;
			$scope.param.teamLeaders = ["Leader01", "Leader02"];
			$scope.changeLeader("Leader02", "MemberFive");
			$scope.saveFunc();
			expect($scope.param.teamLeaders).toEqual(["Leader01", "MemberFive"]);
			expect($scope.param.teamMembers).toEqual(["MemberOne", "MemberTwo",  "MemberThree",  "MemberFour", "Leader02"]);
			expect($scope.param.currentTeamLeaderSize).toEqual(2);
			expect($scope.param.teamLeaders.length).toEqual(2);
			expect($scope.param.teamMembers.length).toEqual(5);
		});
		
		it("Testing change leader if leader doesn't exist", function() {
			$scope.param.currentTeamSize = 1000;
			$scope.param.teamMembers = ["MemberOne", "MemberTwo",  "MemberThree",  "MemberFour", "MemberFive"];
			$scope.param.currentTeamLeaderSize = 2;
			$scope.param.teamLeaders = ["Leader01", "Leader02"];
			$scope.changeLeader("Leader10", "MemberFive");
			$scope.saveFunc();
			expect($scope.param.teamLeaders).toEqual(["Leader01", "Leader02"]);
			expect($scope.param.teamMembers).toEqual(["MemberOne", "MemberTwo",  "MemberThree",  "MemberFour", "MemberFive"]);
			expect($scope.param.currentTeamLeaderSize).toEqual(2);
			expect($scope.param.teamLeaders.length).toEqual(2);
			expect($scope.param.teamMembers.length).toEqual(5);
		});
		
		it("Testing change leader if member doesn't exist", function() {
			$scope.param.currentTeamSize = 1000;
			$scope.param.teamMembers = ["MemberOne", "MemberTwo",  "MemberThree",  "MemberFour", "MemberFive"];
			$scope.param.currentTeamLeaderSize = 2;
			$scope.param.teamLeaders = ["Leader01", "Leader02"];
			$scope.changeLeader("Leader01", "MemberTwenty");
			$scope.saveFunc();
			expect($scope.param.teamLeaders).toEqual(["Leader01", "Leader02"]);
			expect($scope.param.teamMembers).toEqual(["MemberOne", "MemberTwo",  "MemberThree",  "MemberFour", "MemberFive"]);
			expect($scope.param.currentTeamLeaderSize).toEqual(2);
			expect($scope.param.teamLeaders.length).toEqual(2);
			expect($scope.param.teamMembers.length).toEqual(5);
		});
		
		it("Testing add wanted skill", function(){
			$scope.addWantedSkill("JavaScript");
			expect($scope.param.wantedSkills).toContain("JavaScript");
		});
		
		it("Testing add wanted skill if skill already exists", function(){
			$scope.param.wantedSkills = ["C++"];
			$scope.addWantedSkill("C++");
			expect($scope.param.wantedSkills).toEqual(["C++"]);
		});
		
		it("Testing add wanted personality", function(){
			$scope.addWantedPersonalities("Smart");
			expect($scope.param.wantedPersonalities).toContain("Smart");
		});
		
		it("Testing add wanted horoscope", function(){
			$scope.addWantedHoroscopes("Leo");
			expect($scope.param.wantedHoroscopes).toContain("Leo");
		});
		
		it("Testing auto add", function(){
			$scope.autoadd();
		});
	});
	
});