'use strict';
angular.module('Faceblock.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaOauth, $http, $ionicPopup) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.user = {};
  $scope.followers = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.getMe = function(){
    $http.get('http://localhost:3000/me').success(function(data){
      $scope.user.data = data
    });
  }

  $scope.getFollower = function(){
    $http.get('http://localhost:3000/followers').success(function(data){
      $scope.followers.data = data;
    });
  }


  $scope.unfollow = function(){
    //unfollow route goes here
    console.log($scope.followers.data.screen_name);
    $http.post('http://localhost:3000/unfollow/' + $scope.followers.data.screen_name).then(function(data){
      console.log('Unfollowed ', data.screen_name);
    }, function(err){
      console.log('Unfollow error ', err);
    });
  }


  $scope.showAlert = function(user) {
    var alertPopup = $ionicPopup.alert({
      title: 'Faceblocked!',
      template: '@' + user + ' Unfollowed!'
    });
    alertPopup.then(function(res) {
      $scope.getFollower();
      console.log('Hi');
    });
  };



  $scope.twitterLogin = function(){
    $cordovaOauth.twitter('qgyb3jM4W9c1YkgzEhBZtVSIx', 'LM2ScBHKJ72OROQsbsbf80pRTecj8PVpI0fUaVxdt2suIV2YlR')
    .then(function(result){
      console.log('User shit ', result);
      $scope.id = result;
    }, function(err){
      console.log('Ya done fucked up', err);
    });
  };
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  }
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('CardCtrl', function($scope){


});
