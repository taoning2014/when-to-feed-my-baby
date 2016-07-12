angular.module('starter.controllers', ['ionic'])

  .controller('RecordingCtrl', function ($timeout, UtilityFactory, LocalStorageFactory, ServerStorageFactory) {
    var self = this;
    var obj;
    // console.log('Data: ', data);
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
        self.txtBtn2 = 'Changing Daniel\'s Diaper';
      } else {
        obj = UtilityFactory.createObj('feeding', self.feedingAmount);
        console.log('Test feeding amount: ', obj);
        // set record
        LocalStorageFactory.setStorage(obj);
        ServerStorageFactory.setStorage(obj);
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
        self.txtBtn1 = 'Feeding Daniel';
        self.txtBtn2 = 'Click again to record';
      } else {
        obj = UtilityFactory.createObj('changing', self.wetPersentage);
        console.log('Test changing amount: ', obj);
        // set record
        LocalStorageFactory.setStorage(obj);
        ServerStorageFactory.setStorage(obj);
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

  .controller('HistoryCtrl', function ($scope, $timeout, LocalStorageFactory,
                                       ServerStorageFactory, DataFactory, data,
                                       describedFilter) {
    var self = this;
    self.filterBy = '';
    self.items = describedFilter(data);

    self.clear = function () {
      LocalStorageFactory.clearStorage();
      //ServerStorageFactory.clearStorage(function() {
      //  DataFactory.getData(function(data) {
      //  Should better call "self.doRefresh();"
      //    self.items = describedFilter(data);
      //  });
      //});

    };

    // console.log('data: ', data);
    self.doRefresh = function () {
      // console.log('data1: ', data);
      DataFactory.getData(function (data) {
        self.items = describedFilter(data);
        // console.log('data: ', self.items);
        $timeout(function () {
          $scope.$broadcast('scroll.refreshComplete');
        }, 1500);
      });
    };
  });
