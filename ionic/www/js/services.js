angular.module('starter.services', [])

  .factory('LocalStorageFactory', function($window) {
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
      var key = obj.type;
      var array;
      // if (obj.key === 'feeding') {
      //   obj.type = 'Dianel got hungry, so we fed him';
      // } else {
      //   obj.type = 'Oops, he do it again, so we dress him a new diaper';
      // }

      if (!store.getItem(key)) {
        store.setItem(key, JSON.stringify([obj]));
      } else {
        array = JSON.parse(store.getItem(key));
        // console.log(key);
        // console.log(obj);
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

  .factory('ServerStorageFactory', function($http) {
    function getStorage() {
      return $http.get('http://localhost:3000/api/v1');
    }

    function setStorage(obj) {
      return $http.post('http://localhost:3000/api/v1', obj);
    }

    function clearStorage(cb) {
      return $http.delete('http://localhost:3000/api/v1').then(cb);
    }

    return {
      getStorage: getStorage,
      setStorage: setStorage,
      clearStorage: clearStorage
    };
  })

  // this factory get data from local storage and server
  // merge duplicate data then sort before serve to controller
  .factory('DataFactory', function(LocalStorageFactory, $http) {
    function getData(cb) {
      // Todo, merge local and server data together
      return $http.get('http://localhost:3000/api/v1').then(function(result) {
        var dbData = result.data;
        var storageData = LocalStorageFactory.getStorage();
        var itemArray = Array.prototype.concat.apply([], dbData);
        // console.log('itemArray: ', itemArray);
        itemArray = Array.prototype.concat.apply(itemArray, storageData.changingArray);
        itemArray = Array.prototype.concat.apply(itemArray, storageData.feedingArray);
        // console.log('concat: ', itemArray);
        if (typeof cb === 'function') {
          cb(itemArray);
        } else {
          return itemArray;
        }
        return -1;
      });
    }

    return {
      getData: getData
    };
  });
