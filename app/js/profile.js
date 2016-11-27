


var app = angular.module('teamform-profile-app', ['firebase']);
app.controller('profileinput', ['$firebaseAuth','$scope', '$firebaseObject', '$firebaseArray',
function($firebaseAuth, $scope, $firebaseObject, $firebaseArray){

	// Implementation the todoCtrl
    $scope.uid = null;
    $scope.picdefault = "https://firebasestorage.googleapis.com/v0/b/team-long-time-no-name.appspot.com/o/user.jpg?alt=media&token=c071e226-b03d-49a8-8f1f-2d3c6c9565c7"
    initalizeFirebase();
    $scope.input = {
      name: "Username",
      gender: "Male",
			uid: "",
			birth: "1-1-1996",
			star: "Virgo",
      location:"Tsuen Wan".toLowerCase(),
      description:"Hello world"
		};
    $scope.personality = "";
    $scope.pic = "";
    $scope.like = [];
    $scope.check = false;

    $scope.checkifuser = function(){
      console.log($scope.profile.uid);
      if($scope.uid != $scope.profile.uid){

        $scope.check = true;
      }else{
        $scope.check = false;
      }

    }

    var getProfile = function(uid){
      var path= "profile/"+uid;
      var ref = firebase.database().ref(path);
      $scope.profile = $firebaseObject(ref);
      // $scope.profile = $firebaseArray(ref);
      $scope.input.uid=uid;
      $scope.profile.$loaded()
        .then( function(data) {
          for (var key in $scope.input) {
            if (typeof $scope.profile[key]=="undefined") {
              $scope.profile[key] = $scope.input[key];

            }
          }
          if(typeof $scope.profile["like"]=="undefined"){$scope.profile["like"]=$scope.like;}
          if(typeof $scope.profile["pic"]=="undefined"){$scope.profile["pic"]=$scope.picdefault;}
          if(typeof $scope.profile["personality"]=="undefined"){$scope.profile["personality"]=$scope.personality;}
          console.log("HI");
          $scope.profile.$save();
          // console.log(data);
          $scope.checkifuser();
          $(".Profileview").show();
          $(".updateProfileview").hide();
        })
        .catch(function(error) {
          // Database connection error handling...
          console.error("Error:", error);
        });
        return $scope.profile;
    }

    $scope.auth=$firebaseAuth();
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      if (firebaseUser) {
        $scope.uid = firebaseUser.uid;

        console.log("Signed in as:", firebaseUser.uid);
        var profileID = getURLParameter("uid");

        if(profileID!=null && profileID!=undefined){
          console.log("profileID",profileID);
          $scope.profile=getProfile(profileID);
        }else{
          $scope.profile=getProfile($scope.uid);

        }

      } else {
        console.log("Signed out");
      }
    });



    $scope.saveProfile = function() {

      if ( $scope.input.name !="" && $scope.input.gender!="" && $scope.input.birth !="" && $scope.input.star !="" && $scope.input.location !="" && $scope.input.description !=""  ) {
        for (var key in $scope.input) {
            $scope.profile[key] = $scope.input[key];
        }
        console.log("saveprofile");

        $scope.profile.$save();
      }
    }
    $scope.showProfile = function(){
      $(".updateProfileview").hide();
      $(".Profileview").show();

    }
    $scope.editProfile = function(){
      $(".updateProfileview").show();
      $(".Profileview").hide();
    }

    $scope.SkillTemp = "";
    $scope.addSkill = function(){
        if(typeof $scope.profile["skills"]=="undefined"){$scope.profile["skills"]=[];}
        $scope.profile["skills"].push($scope.SkillTemp);
        $scope.profile.$save();
    }
    $scope.removeSkill = function(e){
        $scope.item = $scope.profile.skills.indexOf(e);
        if ($scope.item != -1){
          $scope.profile.skills.splice($scope.item,1);
          $scope.profile.$save();
        }

    }

    $("#file").on("change", function(event){
      selectedFile = event.target.files[0];
      $("#uploadButton").show();
      var tmppath = URL.createObjectURL(event.target.files[0]);
      $("img").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));

      console.log(tmppath);


    });


    $scope.uploadFile = function(){
      var filename = selectedFile.name;
      var storageRef = firebase.storage().ref('/profilepic' + filename);

      var uploadTask = storageRef.put(selectedFile);

      uploadTask.on('state_changed', function(snapshot){
      },function(error){


      },function(){

          $scope.profile.pic = uploadTask.snapshot.downloadURL.toString();
          $scope.profile.$save();


        console.log($scope.profile.pic);
      });
    }

    $scope.removeFile = function(){
      if ($scope.profile.pic != $scope.picdefault){
        $scope.profile.pic = $scope.picdefault;
        $scope.profile.$save();
      }

    }

    // $scope.test1 = true;
    // $scope.test2 = true;
    // $scope.testform1 = function(){
    //
    //   if($scope.test2 == true && $scope.test1 == false){
    //     console.log("fuck");
    //     $scope.test1 = true;
    //     $scope.test2 = false;
    //   }
    //
    // }


          $scope.questions = [{
              question: "Question1",
              choices: [2, 5, 10, 1],

              }, {
              question: "Question2",
              choices: [3, 6, 9, 2],

              }, {
              question: "Question3",
              choices: [72, 99, 108, 3],

              }, {
              question: "Question4",
              choices: [4, 5, 6, 4],

              }, {
              question: "Question5",
              choices: [20, 30, 40, 5],

              }, {
              question: "Question6",
              choices: [20, 30, 40, 5],

              },{
              question: "Question7",
              choices: [20, 30, 40, 5],

              },{
              question: "Question8",
              choices: [20, 30, 40, 5],

              },{
              question: "Question9",
              choices: [20, 30, 40, 5],

              },{
              question: "Question10",
              choices: [20, 30, 40, 5],

              }];

              $scope.presetpersonality = ["Pawn", "Bishop", "Knight", "Rook", "Queen", "King"];


              $scope.count = 0;
              $scope.q = "";
              $scope.option1 = "";
              $scope.option2 = "";
              $scope.option3 = "";
              $scope.option4 = "";
              $scope.ans = "";
              $scope.answer = [];

              $scope.ShowQ = function(){
                $("#finish").hide();
                $(".all").hide();
                for(var a=0;a<$scope.questions.length;a++){
                  if ($scope.count == a){

                      $scope.q = $scope.questions[a].question;
                      for(var b=0;b<$scope.questions[a].choices.length;b++){
                        $scope["option"+(b+1)] = $scope.questions[a].choices[b];
                      }
                  }
                }
              }

              $scope.nextQ = function(){

                $scope.count++;
                $scope.answer.push($scope.ans);
                $scope.ShowQ();
                if ($scope.count == ($scope.questions.length-1)){
                  $("#next").hide();
                  $("#finish").show();
                }
              }

              $scope.score = 0;
              $scope.showAns = function(){
                for (var a=0;a<$scope.answer.length;a++){
                  for (var b=1;b<=$scope.questions[a].choices.length;b++){

                    if ($scope.answer[a] == ("option"+b)){
                      $scope.score+=b;
                    }
                  }
                }
                for (var c=0;c<$scope.presetpersonality.length;c++){
                  if ($scope.score%$scope.presetpersonality.length == c){
                    $scope.profile.personality = $scope.presetpersonality[c];
                    $scope.profile.$save();
                    $("#test").hide();

                  }
                }
                $(".all").show();
                $(".updateProfileview").show();
              }


          $scope.likeFunction = function(){
              $scope.count_like = -1;

              for (var a=0;a<=$scope.profile.like.length;a++){
                if ($scope.uid != $scope.profile.like[a] && $scope.uid != $scope.profile.uid){
                  $scope.count_like++;
                }
              }
              if ($scope.count_like == ($scope.profile.like.length)){
                $scope.profile.like.push($scope.uid);
                $scope.profile.$save();
              }

          }






    // var ref = firebase.database().ref("profileApp");
		// $scope.profile = $firebaseArray(ref);



}]);

app.controller('LoginCtrl', ['$scope', '$firebaseObject', '$firebaseArray','$firebaseAuth', function($scope, $firebaseObject, $firebaseArray, $firebaseAuth) {

  // Call Firebase initialization code defined in site.js
  initalizeFirebase();
  $scope.message = null;
  $scope.error = null;
  $scope.uid = null;
  $scope.logedin =false;
  $scope.profile= null;
  $scope.auth = $firebaseAuth();

  $scope.loginValidation=function(){
    if($scope.username==null&&$scope.password==null){
      $scope.message = "Please fill in the email and password above";
      return false;
    }
    return true;
  }

  $scope.emailAccCreate=function(){
    if($scope.loginValidation()==false){
      return false;
    }
    $scope.auth = $firebaseAuth();
    $scope.auth.$createUserWithEmailAndPassword($scope.username, $scope.password)
    .catch(function(error) {
      $scope.error = error.message;
    });
  };

  $scope.emailLogin=function(){
    if($scope.loginValidation()==false){
      return false;
    }
    $scope.auth = $firebaseAuth();
    // console.log("$scope.username,$scope.password",$scope.username,$scope.password);
    firebase.auth().signInWithEmailAndPassword($scope.username, $scope.password).catch(function(error){
    // $scope.auth.signInWithEmailAndPassword($scope.username, $scope.password).catch(function(error){
      $scope.error = error.message;
      console.error("email Login failed(ng):", error);
    });
  };

  $scope.fbLogin=function(){
    $scope.auth.$signInWithPopup("facebook")
    .catch(function(error) {
      $scope.error = error.message;
      console.error("FB Login fail(ng)",error);
    });
  };

  $scope.signOut =function(){
    $scope.auth.$signOut();
  }

  var getProfile = function(uid){
    var path= "profile/"+uid;
    var ref = firebase.database().ref(path);
    $scope.profile = $firebaseObject(ref);
    $scope.profile.$loaded()
      .catch(function(error) {
        $scope.error = error.message;
        console.error("Error:", error);
      });
    return $scope.profile;
  }
  this.getProfile = getProfile;

  $scope.auth.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $scope.message = "Signed in as:"+ firebaseUser.uid;
      $scope.logedin =true;
      $scope.uid = firebaseUser.uid;
      $scope.profile = getProfile(firebaseUser.uid);
       console.log("Signed in as:", firebaseUser.uid);
    } else {
      $scope.logedin =false;
      $scope.message = "Signed out";
      console.log("Signed out");
    }
  });


}]);
