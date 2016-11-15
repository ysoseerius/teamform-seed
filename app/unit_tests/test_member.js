describe('Test member.js', function() {

  var $controller,$firebaseAuth,$firebaseObject,$firebaseArray;
  beforeEach(function(){
     module('teamform-member-app');

     module(function($provide) {
       var user = {uid : "1234"};
       // Fake StoreService Implementation returning a promise

       $provide.value('$firebaseAuth',function(){
                return{
                      $onAuthStateChanged:function(funct) {funct(user);return user;},
                      };
           }
       );
       $provide.value('$firebaseObject', function(){
          return{
            $loaded: function(){return {then:function(funct){funct();return {catch: function(funct){funct(null);}};},catch: function(funct){funct("error");}};},
            $save: function(){return true;},
          }
       });
       $provide.value('$firebaseArray', function(){
          return{
            $loaded: function(){return {then:function(funct){funct();return {catch: function(funct){funct(null);}};},catch: function(funct){funct("error");}};},
            $save: function(){return true;},
          }
       });
       return null;
     });

     inject(
       function(_$controller_, _$firebaseAuth_, _$firebaseObject_,_$firebaseArray_){
         $controller= _$controller_;
         $firebaseAuth= _$firebaseAuth_;
         $firebaseObject = _$firebaseObject_;
         $firebaseArray = _$firebaseArray_;
       }
     );
   });

   describe('member Controller Test', function() {
     var user = {uid : "1234"};
  	 var $scope ={};
  	 var controller;
     it ('MemberCtrl instantiation', function(){
       controller = $controller('MemberCtrl', { $scope: $scope });
     });

     it ('test load user object', function(){
			spyOn($scope.auth, "$onAuthStateChanged").and.callFake(function(funct) {funct(null);return null;});
     });

    it ('test loadFunc function', function(){
      $scope.userID="asdasd";
      $scope.loadFunc();
    });
    it ('test saveFunc function', function(){
      var team1 = {
                "currentTeamLeaderSize" : 1,
                "currentTeamSize" : 5,
                "numPrettyGirls" : 0,
                "teamLeaders" : [ "bzHk0FxZBMV0uZRO3Jy3mmwSc8J2" ],
                "teamName" : "newTeam",
                "wantedHoroscopes" : "Aries",
                "wantedPersonalities" : "good",
                "wantedSkills" : [ "CSS", "JavaScript", "HTML" ],
                "personality":["Aries","ABC"],
                "score":1
              };
      var team2 = {
                "currentTeamLeaderSize" : 1,
                "currentTeamSize" : 5,
                "numPrettyGirls" : 0,
                "teamLeaders" : [ "bzHk0FxZBMV0uZRO3Jy3mmwSc8J2" ],
                "teamName" : "newTeam",
                "wantedHoroscopes" : "Aries",
                "wantedPersonalities" : "good",
                "wantedSkills" : [ "CSS", "JavaScript", "HTML" ],
                "personality":["Aries","ABC"],
                "score":2
              }
      $scope.teams=[team1,team2];
      $scope.userID="1234";
      $scope.userName="uName";
      $scope.saveFunc();
    });
    it ('test refreshAds function', function(){
      // spyOn($scope.advertisements, "$loaded").and.callThrough();
      $scope.refreshAds();
      expect($scope.advertisements).not.toBeNull();
    });

    it ('test selectall function', function(){
      // spyOn($scope.team, "$loaded").and.callThrough();
      $scope.selectall()
      expect($scope.selection).not.toBeNull();
    });
    it ('test refreshTeams function', function(){
      // spyOn($scope.advertisements, "$loaded").and.callThrough();
      $scope.refreshTeams();
      expect($scope.advertisements).not.toBeNull();
    });
    it ('test getProfile function', function(){
      // spyOn($scope.profile, "$loaded").and.callThrough();
      var team1 = {
                "currentTeamLeaderSize" : 1,
                "currentTeamSize" : 5,
                "numPrettyGirls" : 0,
                "teamLeaders" : [ "bzHk0FxZBMV0uZRO3Jy3mmwSc8J2" ],
                "teamName" : "newTeam",
                "wantedHoroscopes" : "Aries",
                "wantedPersonalities" : "good",
                "wantedSkills" : [ "CSS", "JavaScript", "HTML" ],
                "personality":["Aries","ABC"],
                "score":1
              };
      var team2 = {
                "currentTeamLeaderSize" : 1,
                "currentTeamSize" : 5,
                "numPrettyGirls" : 0,
                "teamLeaders" : [ "bzHk0FxZBMV0uZRO3Jy3mmwSc8J2" ],
                "teamName" : "newTeam",
                "wantedHoroscopes" : "Aries",
                "wantedPersonalities" : "good",
                "wantedSkills" : [ "CSS", "JavaScript", "HTML" ],
                "personality":["Aries","ABC"],
                "score":2
              }
      $scope.teams=[team1,team2];
      $scope.skillsmatch();
      expect($scope.profile).not.toBeNull();
    });
    it ('test personalitymatch function', function(){
      var team1 = {
                "currentTeamLeaderSize" : 1,
                "currentTeamSize" : 5,
                "numPrettyGirls" : 0,
                "teamLeaders" : [ "bzHk0FxZBMV0uZRO3Jy3mmwSc8J2" ],
                "teamName" : "newTeam",
                "wantedHoroscopes" : "Aries",
                "wantedPersonalities" : "good",
                "wantedSkills" : [ "CSS", "JavaScript", "HTML" ],
                "personality":["Aries","ABC"],
                "score":1
              };
      var team2 = {
                "currentTeamLeaderSize" : 1,
                "currentTeamSize" : 5,
                "numPrettyGirls" : 0,
                "teamLeaders" : [ "bzHk0FxZBMV0uZRO3Jy3mmwSc8J2" ],
                "teamName" : "newTeam",
                "wantedHoroscopes" : "Aries",
                "wantedPersonalities" : "good",
                "wantedSkills" : [ "CSS", "JavaScript", "HTML" ],
                "personality":["Aries","ABC"],
                "score":2
              }
      $scope.teams=[team1,team2];
      $scope.personalitymatch();
      expect($scope.teams).not.toBeNull();
    });
    it ('test starmatch function', function(){
      var team1 = {
                "currentTeamLeaderSize" : 1,
                "currentTeamSize" : 5,
                "numPrettyGirls" : 0,
                "teamLeaders" : [ "bzHk0FxZBMV0uZRO3Jy3mmwSc8J2" ],
                "teamName" : "newTeam",
                "wantedHoroscopes" : "Aries",
                "wantedPersonalities" : "good",
                "wantedSkills" : [ "CSS", "JavaScript", "HTML" ],
                "personality":["Aries","ABC"],
                "skills":[ "CSS", "JavaScript", "HTML" ],
                "star":"Aries",
                "score":1
              };
      var team2 = {
                "currentTeamLeaderSize" : 1,
                "currentTeamSize" : 5,
                "numPrettyGirls" : 0,
                "teamLeaders" : [ "bzHk0FxZBMV0uZRO3Jy3mmwSc8J2" ],
                "teamName" : "newTeam",
                "wantedHoroscopes" : "Aries",
                "wantedPersonalities" : "good",
                "wantedSkills" : [ "CSS", "JavaScript", "HTML" ],
                "personality":["Aries","ABC"],
                "skills":[ "CSS", "JavaScript", "HTML" ],
                "star":"Aries",
                "score":2
              }
      $scope.teams=[team1,team2];
      $scope.starmatch();
      expect($scope.teams).not.toBeNull();
    });
    it ('test largerthan function', function(){
      var team1 = {
                "currentTeamLeaderSize" : 1,
                "currentTeamSize" : 5,
                "numPrettyGirls" : 0,
                "teamLeaders" : [ "bzHk0FxZBMV0uZRO3Jy3mmwSc8J2" ],
                "teamName" : "newTeam",
                "wantedHoroscopes" : "Aries",
                "wantedPersonalities" : "good",
                "wantedSkills" : [ "CSS", "JavaScript", "HTML" ],
                "personality":["Aries","ABC"],
                "skills":[ "CSS", "JavaScript", "HTML" ],
                "star":"Aries",
                "score":1
              };
      var re = $scope.largerthan();
      expect(re(team1)).not.toBeNull();
      team1.teamMembers=["1","2","3"];
      expect(re(team1)).not.toBeNull();
    });
   });
});
