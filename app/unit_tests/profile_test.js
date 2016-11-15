describe('Test profile.js', function() {

  var $controller,$firebaseAuth;
  beforeEach(function(){
     module('teamform-profile-app');

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


       return null;
     });

     inject(
       function(_$controller_, _$firebaseAuth_, _$firebaseObject_){
         $controller= _$controller_;
         $firebaseAuth= _$firebaseAuth_;
         $firebaseObject = _$firebaseObject_;
       }
     );
   });

  // var $controller;
  // beforeEach(function(){
  //    module('teamform-profile-app');
  //    inject(
  //      function(_$controller_){
  //        $controller=_$controller_;
  //      }
  //    );
  //  });

   describe('Controller Test', function() {
     var user = {uid : "1234"};
		 var $scope ={};
		 var controller;

     it('test addQ and nextQ function', function(){

       controller = $controller('profileinput', { $scope: $scope });
       $scope.questions = [{
         question: "How are you",
         choices: ["1", "2", "3", "4"],
       },{
         question: "How old are you",
         choices: ["A","B","C","D"]

       }];
       $scope.q ="";
       $scope.option1 = "";
       $scope.option2 = "";
       $scope.option3 = "";
       $scope.option4 = "";
       $scope.count = 0;
       $scope.ans = "";
       $scope.answer = [];
       $scope.nextQ();
       expect($scope.count).toEqual(1);
       expect($scope.answer.length).toEqual(1);
       expect($scope.q).toEqual("How old are you");
       expect($scope.option1).toEqual("A");
       expect($scope.option2).toEqual("B");
       expect($scope.option3).toEqual("C");
       expect($scope.option4).toEqual("D");

     });
    it ('test showProfile function', function(){
      // controller = $controller('profileinput', { $scope: $scope });
      // updateProfileview.show();
      // $(".Profileview").hide();
      $scope.showProfile();
    });
    it ('test editProfile function', function(){
      // controller = $controller('profileinput', { $scope: $scope });
      $scope.editProfile();
    });
    it ('test saveProfile function', function(){
      spyOn($scope.profile, "$save").and.callThrough();
      $scope.saveProfile();

    });
    it ('test addSkill function', function(){
      spyOn($scope.profile, "$save").and.callThrough();
      $scope.addSkill();

    })

    it ('test removeSkill function', function(){
      spyOn($scope.profile, "$save").and.callThrough();
      $scope.profile.skills = ["hi","ab"];
      $scope.item = $scope.profile.skills.indexOf("hi");
      $scope.removeSkill("hi");
      expect($scope.profile.skills.length).toEqual(1);
    });

    it ('test removeFile function', function(){
      spyOn($scope.profile, "$save").and.callThrough();
      $scope.profile.pic = "123";
      $scope.profile.picdefault = 'https://firebasestorage.googleapis.com/v0/b/team-long-time-no-name.appspot.com/o/user.jpg?alt=media&token=c071e226-b03d-49a8-8f1f-2d3c6c9565c7';
      $scope.removeFile();
      expect($scope.profile.pic).toEqual('https://firebasestorage.googleapis.com/v0/b/team-long-time-no-name.appspot.com/o/user.jpg?alt=media&token=c071e226-b03d-49a8-8f1f-2d3c6c9565c7');

    });

    it ('test showAns function', function(){
      $scope.questions = [{
        question: "How are you",
        choices: ["1", "2", "3", "4"],
      },{
        question: "How old are you",
        choices: ["A","B","C","D"]
      }];

      $scope.answer = ["option1", "option1"];
      $scope.score = 0;
      spyOn($scope.profile, "$save").and.callThrough();
      $scope.showAns();
      expect($scope.score).toEqual(2);
    });

    it ('test likeFunction', function(){
      spyOn($scope.profile, "$save").and.callThrough();
      $scope.count_like = 0;
      $scope.profile.like = ["abc"];
      $scope.uid = "123";
      $scope.profile.uid = "234";
      $scope.likeFunction();
      expect($scope.count_like).toEqual(1);
      expect($scope.profile.like.length).toEqual(2);

    });
    it ('test checkifuser function', function(){
      spyOn($scope.profile, "$save").and.callThrough();
      $scope.uid = "123";
      $scope.profile.uid = "abc";
      $scope.checkifuser();
      expect($scope.check).toEqual(true);


    });

    // it('test uploadFile function', function(){
    //   spyOn($scope.profile, "$save").and.callThrough();
    //   var selectedFile = 0;
    //   $scope.uploadFile();
    //
    // });


   });
});
