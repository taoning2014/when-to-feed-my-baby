angular.module('starter.controllers', ['ionic'])

  .controller('RecordingCtrl', function ($timeout, StorageFactory) {
    var self = this;
    // properties to card 1
    self.inFeedingState = false;
    self.txtBtn1 = 'Feeding Daniel';
    self.feedingAmount = 50;

    // properties to card 2
    self.inChangingDiapelState = false;
    self.txtBtn2 = 'Changing Daniel\'s Diaper';
    self.wetPersentage = 50;

    self.feeding = function () {
      if (!self.inFeedingState) {
        self.inFeedingState = true;
        self.inChangingDiapelState = false;
        self.txtBtn1 = 'Click again to record';
      } else {
        // set record
        StorageFactory.setStorage(self.feedingAmount, 'feeding');
        self.txtBtn1 = 'Recording to server...';
        self.disableCard = true;
        $timeout(function () {
          self.txtBtn1 = 'Feeding Daniel';
          self.disableCard = false;
          self.inFeedingState = false;
          self.feedingAmount = 50;
        }, 1500);
      }
    };

    self.changing = function () {
      if (!self.inChangingDiapelState) {
        self.inFeedingState = false;
        self.inChangingDiapelState = true;
        self.txtBtn2 = 'Click again to record';
      } else {
        // set record
        StorageFactory.setStorage(self.wetPersentage, 'changing');
        self.txtBtn2 = 'Recording to server...';
        self.disableCard = true;
        $timeout(function () {
          self.txtBtn2 = 'Changing Daniel\'s Diaper';
          self.disableCard = false;
          self.inChangingDiapelState = false;
          self.wetPersentage = 50;
        }, 1500);
      }
    };
  })

  .controller('HistoryCtrl', function ($scope, $timeout, StorageFactory) {
    var self = this;
    self.items = StorageFactory.getStorage();
    self.filterBy = '';

    self.doRefresh = function () {
      console.log(self.filterBy);
      console.log('doRefresh');
      self.items = StorageFactory.getStorage();
      $timeout(function () {
        console.log('Done, now broadcasting');
        $scope.$broadcast('scroll.refreshComplete');
      }, 1500);
    };
  });

