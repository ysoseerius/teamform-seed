describe('Test login.js', function() {

   //
   // Example: A test case of getRandomIntInclusive
   //
	 var $controller,$firebaseAuth,$firebaseObject;
	 beforeEach(function(){
      module('teamform-app');

			module(function($provide) {
				var user = {uid : "1234"};
				// Fake StoreService Implementation returning a promise
				$provide.value('$firebaseAuth',function(){
							return {	$createUserWithEmailAndPassword: function(username, password) {return {then: function(callback) {return callback(user);} ,catch:function(callback){return callback("error");}};},
												signInWithEmailAndPassword: function(username,password) {return {catch: function(callback) { return callback({message:null}); }};},
												$signOut: function() { return null;},
												$onAuthStateChanged:function(funct) {funct(user);return user;},
												$signInWithPopup:function(way){return {catch: function(callback) { return callback({message:null}); }};}
											};
						}
				);

				$provide.value('$firebaseObject',function(ref){
							return {
								$loaded: function() {return {catch: function(callback) {return callback("error");}};}
							};
						}
				);
				return null;
			});


      inject(
        function(_$controller_, _$firebaseAuth_, _$firebaseObject_){
          $controller=_$controller_;
					$firebaseAuth=_$firebaseAuth_;
					$firebaseObject = _$firebaseObject_
        }
      );
    });

   describe('Controller Test', function() {
		 var user = {uid : "1234"};
		 var $scope ={};
		 var controller;
		 it('loginValidation test', function() {
			 // var $scope ={};
			 controller = $controller('LoginCtrl', { $scope: $scope });
			 $scope.username=null;
			 $scope.password=null;
			 expect($scope.loginValidation()).toEqual(false);
			 $scope.username="abc@dfe.com";
			 $scope.password="abcd1234";
			 expect($scope.loginValidation()).toEqual(true);
		 });
		it('emailAccCreate test', function(done) {
			spyOn($scope.auth, "$createUserWithEmailAndPassword").and.callThrough();
			$scope.error=null;
			$scope.username=null;
			$scope.password=null;
			$scope.emailAccCreate();
			$scope.username="abc@dfe.com";
			$scope.password="abcd1234";
			$scope.emailAccCreate();
			expect($scope.error).toBeNull();
		});
		it('emailLogin test', function() {
			$scope.username="abc@dfe.com";
			$scope.password="abcd1234";
			$scope.error=null;
			$scope.firebaseUser=null;
			spyOn($scope.auth, "signInWithEmailAndPassword").and.callThrough();
			$scope.emailLogin();
			expect($scope.error).toBeNull();
		});
		it('emailLogin fail test', function() {
			$scope.username=null;
			$scope.password=null;
			spyOn($scope.auth, "signInWithEmailAndPassword").and.callThrough();
			$scope.emailLogin();
			expect($scope.error).toBeNull();
		});
		it('fbLogin test', function() {
			$scope.error=null;
			spyOn($scope.auth, "$signInWithPopup").and.callThrough();
			$scope.fbLogin();
			expect($scope.error).toBeNull();

		});
		it('fbLogin fail test', function() {
			$scope.error=null;
			spyOn($scope.auth, "$signInWithPopup").and.callFake(function() {
				return {
					catch: function(callback) { return callback("error"); }
				};
			});
			$scope.fbLogin();
			expect($scope.error).not.toBeNull();
		});
		it('signOut test', function() {
			spyOn($scope.auth, "$onAuthStateChanged").and.callFake(function(funct) {funct(null);return null;});
			spyOn($scope.auth, "$signOut").and.callThrough();
			$scope.signOut();
		});
		it('get profile', function() {
			spyOn($scope.profile, "$loaded").and.callThrough();
			spyOn($scope.auth, "$signOut").and.callThrough();
			controller.getProfile();
		});
	});
});
