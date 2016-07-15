(function () {
  angular.module('starter.controllers', ['ionic'])
    .controller('RecordingCtrl', RecordingCtrl)
    .controller('HistoryCtrl', HistoryCtrl);

  function RecordingCtrl($timeout, UtilityFactory, LocalStorageFactory, ServerStorageFactory) {
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

    // bindable function
    self.feeding = feeding;
    self.changing = changing;

    function feeding() {
      if (!self.inFeedingState) {
        self.inFeedingState = true;
        self.inChangingDiapelState = false;
        self.txtBtn1 = 'Click again to record';
        self.txtBtn2 = 'Changing Daniel\'s Diaper';
      } else {
        obj = UtilityFactory.createObj('feeding', self.feedingAmount);
        console.log('Test feeding amount: ', obj);
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
    }

    function changing() {
      if (!self.inChangingDiapelState) {
        self.inFeedingState = false;
        self.inChangingDiapelState = true;
        self.txtBtn1 = 'Feeding Daniel';
        self.txtBtn2 = 'Click again to record';
      } else {
        obj = UtilityFactory.createObj('changing', self.wetPersentage);
        console.log('Test changing amount: ', obj);
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
    }
  }

  function HistoryCtrl($scope, $timeout, LocalStorageFactory,
                       ServerStorageFactory, DataFactory, data,
                       describedFilter) {
    var self = this;
    self.filterBy = '';
    self.items = describedFilter(data);
    self.clear = clear;
    self.doRefresh = doRefresh;

    function clear() {
      LocalStorageFactory.clearStorage();
      ServerStorageFactory.clearStorage().then(function () {
        self.doRefresh();
      });
    }

    function doRefresh() {
      DataFactory.getData().then(function (data) {
        self.items = describedFilter(data);
        $timeout(function () {
          $scope.$broadcast('scroll.refreshComplete');
        }, 1500);
      });
    }
  }
})();
