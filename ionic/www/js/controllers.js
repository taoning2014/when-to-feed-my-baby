angular.module('starter.controllers', [])

  .controller('RecordingCtrl', function ($timeout, StorageFactory) {
    var self = this;
    // properties to card 1
    self.inFeedingState = false;
    self.txtBtn1 = "Feeding Daniel";
    self.feedingAmount = 50;

    // properties to card 2
    self.inChangingDiapelState = false;
    self.txtBtn2 = "Changing Daniel's Diaper";
    self.wetPersentage = 50;

    self.feeding = function () {
      if (!self.inFeedingState) {
        self.inFeedingState = true;
        self.inChangingDiapelState = false;
        self.txtBtn1 = "Click again to record";
      } else {
        // set record
        StorageFactory.setFeeding(self.feedingAmount);
        self.txtBtn1 = "Recording to server...";
        self.disableCard = true;
        $timeout(function(){
          self.txtBtn1 = "Feeding Daniel";
          self.disableCard = false;
          self.inFeedingState = false;
          self.feedingAmount = 50;
        },1500)
      }
    }

    self.changing = function () {
      if (!self.inChangingDiapelState) {
        self.inFeedingState = false;
        self.inChangingDiapelState = true;
        self.txtBtn2 = "Click again to record";
      } else {
        // set record
        StorageFactory.setChanging(self.wetPersentage);
        self.txtBtn2 = "Recording to server...";
        self.disableCard = true;
        $timeout(function(){
          self.txtBtn2 = "Changing Daniel's Diaper";
          self.disableCard = false;
          self.inChangingDiapelState = false;
          self.wetPersentage = 50;
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
