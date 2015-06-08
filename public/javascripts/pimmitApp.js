var app = angular.module('pimmitApp', ['ngRoute', 'ngResource']).run(function($rootScope, $http) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';
	
	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = '';
	};


});

app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
    .when('/postdetail', {
      templateUrl: 'postdetail.html',
      controller: 'mainController'
    })
		//the login display
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/signup', {
			templateUrl: 'register.html',
			controller: 'authController'
		});
});

app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});

app.controller('mainController', function(postService, $scope, $rootScope, $location){
	$scope.posts = postService.query();
	$scope.newPost = {created_by: '', text: '', created_at: ''};
	
	$scope.post = function() {
	  $scope.newPost.created_by = $rootScope.current_user;
	  $scope.newPost.created_at = Date.now();
	  postService.save($scope.newPost, function(){
	    $scope.posts = postService.query();
	    $scope.newPost = {created_by: '', text: '', created_at: ''};
	  });
    $location.path('/');
	};

	$scope.categories = [
        {'lookupCode': '1', 'description': 'Tools and Gardening'},
        {'lookupCode': '2', 'description': 'Sports and Outdoors'},
        {'lookupCode': '3', 'description': 'Parties and Events'},
        {'lookupCode': '4', 'description': 'Apparel and Fashion'},
        {'lookupCode': '5', 'description': 'Kids and Babies'},
        {'lookupCode': '6', 'description': 'Electronics'},
        {'lookupCode': '7', 'description': 'Movies, Music, Books and Games'},
        {'lookupCode': '8', 'description': 'Motor Vehicles'},
        {'lookupCode': '9', 'description': 'Arts and Crafts'},
        {'lookupCode': '10', 'description': 'Home and Appliances'},
        {'lookupCode': '11', 'description': 'Office and Education'}
    ];
    
});

app.controller('authController', function($scope, $rootScope, $http, $location){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/postdetail');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
});
