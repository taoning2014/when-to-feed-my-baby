angular.module('starter.controllers', [])

  .controller('RecordingCtrl', function ($scope, $timeout, StorageFactory) {
    // properties to card 1
    $scope.inFeedingState = false;
    $scope.txtBtn1 = "Feeding Daniel";
    $scope.feedingAmount = 50;

    // properties to card 2
    $scope.inChangingDiapelState = false;
    $scope.txtBtn2 = "Changing Daniel's Diaper";
    $scope.wetPersentage = 50;

    $scope.feeding = function () {
      if (!$scope.inFeedingState) {
        $scope.inFeedingState = true;
        $scope.inChangingDiapelState = false;
        $scope.txtBtn1 = "Click again to record";
      } else {
        // set record
        StorageFactory.setFeeding($scope.feedingAmount);
        $scope.feedingAmount = 50;
        $scope.txtBtn1 = "Recording to server...";
        $scope.disableCard1 = true;
        $timeout(function(){
          $scope.txtBtn1 = "Feeding Daniel";
          $scope.disableCard1 = false;
          $scope.inFeedingState = false;
        },1500)
      }
    }

    $scope.changing = function () {
      if (!$scope.inChangingDiapelState) {
        $scope.inFeedingState = false;
        $scope.inChangingDiapelState = true;
        $scope.txtBtn2 = "Click again to record";
      } else {
        // set record
        StorageFactory.setChanging($scope.wetPersentage);
        $scope.wetPersentage = 50;
        $scope.txtBtn2 = "Recording to server...";
        $scope.disableCard2 = true;
        $timeout(function(){
          $scope.txtBtn2 = "Changing Daniel's Diaper";
          $scope.disableCard2 = false;
          $scope.inChangingDiapelState = false;
        },1500)
      }
    }
  })

  .controller('HistoryCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('HistoryDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .factory('StorageFactory', function ($window) {
    var store = $window.localStorage;
    return {
      setFeeding: function(amount){store.setItem(createKey("feeding"), amount);},
      setChanging: function(amount){store.setItem(createKey("changing"), amount);}
    };

    function createKey(prefix) {
      return prefix + Date.now();
    }
  });
