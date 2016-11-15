describe('Test profile.js', function() {


  var $controller;
  beforeEach(function(){
     module('teamform-profile-app');
     inject(
       function(_$controller_){
         $controller=_$controller_;
       }
     );
   });

   describe('Controller Test', function() {
		 var $scope ={};
		 var controller;

    //  it('test showQ function', function() {
		// 	//  var $scope ={};
		// 	 controller = $controller('profileinput', { $scope: $scope });
    //     $scope.questions = [{
    //       question: "How are you",
    //       choices: ["1", "2", "3", "4"],
    //     }];
    //     $scope.q ="";
    //     $scope.option1 = "";
    //     $scope.option2 = "";
    //     $scope.option3 = "";
    //     $scope.option4 = "";
    //     $scope.count = 0;
    //     $scope.ShowQ();
    //     expect($scope.q).toEqual("How are you");
    //     expect($scope.option1).toEqual("1");
    //     expect($scope.option2).toEqual("2");
    //     expect($scope.option3).toEqual("3");
    //     expect($scope.option4).toEqual("4");
     //
     //
     //
		//  });

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

    //  it ('test checkifuser', function(){
    //   //  controller = $controller('profileinput', { $scope: $scope });
    //    $scope.uid ="a123";
    //    $scope.profile.uid = "abc"
    //    $scope.check = false;
    //    $scope.checkifuser();
    //    expect($scope.check).toEqual(false);
     //
    //  });

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

    // it ('test file function',function(){
    //
    // });

   });
});
