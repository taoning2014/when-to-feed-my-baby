angular.module('starter.controllers', ['ionic'])

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
        StorageFactory.setStorage(self.feedingAmount, "feeding");
        self.txtBtn1 = "Recording to server...";
        self.disableCard = true;
        $timeout(function () {
          self.txtBtn1 = "Feeding Daniel";
          self.disableCard = false;
          self.inFeedingState = false;
          self.feedingAmount = 50;
        }, 1500)
      }
    }

    self.changing = function () {
      if (!self.inChangingDiapelState) {
        self.inFeedingState = false;
        self.inChangingDiapelState = true;
        self.txtBtn2 = "Click again to record";
      } else {
        // set record
        StorageFactory.setStorage(self.wetPersentage, "changing");
        self.txtBtn2 = "Recording to server...";
        self.disableCard = true;
        $timeout(function () {
          self.txtBtn2 = "Changing Daniel's Diaper";
          self.disableCard = false;
          self.inChangingDiapelState = false;
          self.wetPersentage = 50;
        }, 1500)
      }
    }
  })

  .controller('HistoryCtrl', function ($scope, $timeout,StorageFactory) {
    var self = this;
    self.items = StorageFactory.getStorage();
    self.filterBy ='';

    self.doRefresh = function() {
      console.log(self.filterBy);
      console.log("doRefresh");
      self.items = StorageFactory.getStorage();
      $timeout(function(){
        console.log("Done, now broadcasting");
        $scope.$broadcast('scroll.refreshComplete');
      },1500)
    }
  })

  .factory('StorageFactory', function ($window) {
    var store = $window.localStorage;

    return {
      getStorage: getStorage,
      setStorage: setStorage
    };

    // return an obj contains 2 arrays
    function getStorage() {
      var feeding = store.getItem("feeding");
      var changing = store.getItem("changing");
      return {
        feedingArray: JSON.parse(feeding),
        changingArray: JSON.parse(changing)
      }
    }

    // push data into one array based on the key
    function setStorage(amountParam, key) {
      // create an object to push in array in storage
      var keyStr;
      if (key === "feeding") {
        keyStr = "Dianel got hungry, so we fed him";
      } else {
        keyStr = "Oops, he do it again, so we dress him a new diaper";
      }
      var obj = {
        type: keyStr,
        time: Date.now(),
        amount:amountParam
      };

      if (!store.getItem(key)) {
        store.setItem(key, JSON.stringify([obj]));
      } else {
        var array = JSON.parse(store.getItem(key));
        array.push(obj);
        store.setItem(key, JSON.stringify(array));
      }
    }

  });
