angular.module('starter.services', [])

  .factory('LocalStorageFactory', function ($window) {
    var store = $window.localStorage;

    // return an obj contains 2 arrays
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
      var key = obj.feeding !== 0 ? 'feeding' : 'changing';
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

    return {
      getStorage: getStorage,
      setStorage: setStorage,
      clearStorage: clearStorage
    };
  })

  .factory('ServerStorageFactory', function (UtilityFactory, $http) {
    function getStorage() {
      console.log('Debug: ');
      console.log(UtilityFactory.backendAPIURL);
      return $http.get(UtilityFactory.backendAPIURL);
    }

    function setStorage(obj) {
      console.log('call backend');
      console.log(obj);
      return $http.post(UtilityFactory.backendAPIURL, obj);
    }

    function clearStorage(cb) {
      return $http.delete(UtilityFactory.backendAPIURL).then(cb);
    }

    return {
      getStorage: getStorage,
      setStorage: setStorage,
      clearStorage: clearStorage
    };
  })

  // this factory get data from local storage and server
  // merge duplicate data then sort before serve to controller
  .factory('DataFactory', function (LocalStorageFactory, UtilityFactory, $http) {
    function getData(cb) {
      //var storageData = LocalStorageFactory.getStorage();
      //var removeDuplicate = UtilityFactory.merge(null, storageData);
      //if (typeof cb === 'function') {
      //  cb(removeDuplicate);
      //} else {
      //  return removeDuplicate;
      //}

      return $http.get(UtilityFactory.backendAPIURL).then(function (result) {
        var removeDuplicate;
        var dbData = result.data;
        var storageData = LocalStorageFactory.getStorage();
        // merge local and db
        removeDuplicate = UtilityFactory.merge(dbData, storageData);
        console.log('debug remove: ');
        console.log(removeDuplicate);
        if (typeof cb === 'function') {
          cb(removeDuplicate);
        } else {
          return removeDuplicate;
        }
        return -1;
      });
    }

    return {
      getData: getData
    };
  })

  // utility functions
  .factory('UtilityFactory', function () {
    function createObj(keyStr, amountNum) {
      var newObj = {
        date: Date.now(),
        feeding: 0,
        changing: 0
      };

      switch (keyStr) {
        case 'feeding':
          newObj.feeding = amountNum;
          break;
        case 'changing':
          newObj.changing = amountNum;
          break;
        default:
          break;
      }

      return newObj;
    }

    function merge(dbData, storageData) {
      var itemArray = Array.prototype.concat.apply([], dbData);

      itemArray = Array.prototype.concat.apply(itemArray, storageData.changingArray);
      itemArray = Array.prototype.concat.apply(itemArray, storageData.feedingArray);

      // remove duplicate elements
      return itemArray
        .sort(function (item1, item2) {
          return item1.date - item2.date;
        })
        .filter(function (item, pos, array) {
          return !pos || item.date !== array[pos - 1].date;
        });
    }

    return {
      createObj: createObj,
      merge: merge,
      backendAPIURL: 'http://localhost:3000/api/v1'
    };
  });
