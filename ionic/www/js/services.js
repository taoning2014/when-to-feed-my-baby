(function () {
  angular.module('starter.services', [])
    .factory('LocalStorageFactory', LocalStorageFactory)
    .factory('ServerStorageFactory', ServerStorageFactory)
    .factory('DataFactory', DataFactory)
    .factory('UtilityFactory', UtilityFactory);

  function LocalStorageFactory($window) {
    var store = $window.localStorage;
    var service = {
      getStorage: getStorage,
      setStorage: setStorage,
      clearStorage: clearStorage
    };
    return service;

    function getStorage() {
      var feeding = store.getItem('feeding');
      var changing = store.getItem('changing');
      return {
        feedingArray: JSON.parse(feeding),
        changingArray: JSON.parse(changing)
      };
    }

    // push data into one array based on the key
    function setStorage(obj) {
      var key = parseInt(obj.feeding) !== 0 ? 'feeding' : 'changing';
      var array;
      if (!store.getItem(key)) {
        store.setItem(key, JSON.stringify([obj]));
      } else {
        array = JSON.parse(store.getItem(key));
        array.push(obj);
        store.setItem(key, JSON.stringify(array));
      }
    }

    // clear data store in local storage
    function clearStorage() {
      store.setItem('feeding', '[]');
      store.setItem('changing', '[]');
    }
  }

  function ServerStorageFactory(UtilityFactory, $http) {
    var service = {
      getStorage: getStorage,
      setStorage: setStorage,
      clearStorage: clearStorage
    };
    return service;

    function getStorage() {
      console.log(UtilityFactory.backendAPIURL);
      return $http.get(UtilityFactory.backendAPIURL).catch(function (err) {
        console.log('server is not up');
        return null;
      });
    }

    function setStorage(obj) {
      return $http.post(UtilityFactory.backendAPIURL, obj).catch(function (err) {
        console.log('server is not up');
        return null;
      });
    }

    function clearStorage() {
      return $http.delete(UtilityFactory.backendAPIURL).catch(function (err) {
        console.log('server is not up');
        return null;
      });
    }
  }

  // this factory get data from local storage and server
  // merge duplicate data then sort before serve to controller
  function DataFactory(LocalStorageFactory, UtilityFactory, $http, $q) {
    var service = {
      getData: getData
    };
    return service;

    function getData() {
      return $http.get(UtilityFactory.backendAPIURL).then(function (result) {
        var dbData = result.data;
        var storageData = LocalStorageFactory.getStorage();
        return $q.when(UtilityFactory.merge(dbData, storageData));
      }, function (err) {
        return $q.when(UtilityFactory.merge(null, LocalStorageFactory.getStorage()));
      });
    }
  }

  function UtilityFactory() {
    // aws location: ec2-52-90-75-44.compute-1.amazonaws.com
    var service = {
      createObj: createObj,
      merge: merge,
      backendAPIURL: 'http://localhost:3000/api/v1'
    };
    return service;

    function createObj(keyStr, amountNum) {
      var newObj = {
        date: (new Date()).toISOString(),
        _time: (new Date()).getHours().toString(),
        feeding: 0,
        changing: 0
      };

      switch (keyStr) {
        case 'feeding':
          newObj.feeding = parseInt(amountNum);
          break;
        case 'changing':
          newObj.changing = parseInt(amountNum);
          break;
        default:
          break;
      }

      return newObj;
    }

    function merge(dbData, storageData) {
      var itemArray = Array.prototype.concat.apply([], dbData);
      var map = {};
      itemArray = Array.prototype.concat.apply(itemArray, storageData.changingArray);
      itemArray = Array.prototype.concat.apply(itemArray, storageData.feedingArray);

      console.log('Debug array');
      console.log(itemArray);
      // remove duplicate elements
      return itemArray
        .filter(function (item, pos, array) {
          if (map[item.date]) {
            return false;
          }

          map[item.date] = true;
          return true;
        });
    }
  }
})();
