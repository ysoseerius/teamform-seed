angular.module('teamform-app', ['firebase'])
.controller('LoginCtrl', ['$scope', '$firebaseObject', '$firebaseArray','$firebaseAuth', function($scope, $firebaseObject, $firebaseArray, $firebaseAuth) {

  // Call Firebase initialization code defined in site.js
  initalizeFirebase();
  $scope.firebaseUser = null;
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
    $scope.auth.$createUserWithEmailAndPassword($scope.username, $scope.password)
    .catch(function(error) {
      $scope.error = error.message;
    });
  };

  $scope.emailLogin=function(){
    if($scope.loginValidation()==false){
      return false;
    }
    // console.log("$scope.username,$scope.password",$scope.username,$scope.password);
    $scope.auth.signInWithEmailAndPassword($scope.username, $scope.password).catch(function(error){
      $scope.error = error.message;
      console.error("email Login failed(ng):", error);
    });
  };

  $scope.fbLogin=function(){
    $scope.auth.$signInWithPopup("facebook")
    // .then(function(result) {
    //   $scope.firebaseUser = firebaseUser;
    //   // console.log("FB Login successfully(ng)",user);
    // })
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
    var profile = $firebaseObject(ref);
    profile.$loaded()
      .catch(function(error) {
        $scope.error = error.message;
        console.error("Error:", error);
      });
    return profile;
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
