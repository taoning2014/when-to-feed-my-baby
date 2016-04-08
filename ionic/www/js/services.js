angular.module('starter.services', [])

  .factory('StorageFactory', function ($window) {
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
    function setStorage(amountParam, key) {
      // create an object to push in array in storage
      var keyStr;
      var array;
      var obj = {
        type: keyStr,
        time: Date.now(),
        amount: amountParam
      };

      if (key === 'feeding') {
        obj.type = 'Dianel got hungry, so we fed him';
      } else {
        obj.type = 'Oops, he do it again, so we dress him a new diaper';
      }

      if (!store.getItem(key)) {
        store.setItem(key, JSON.stringify([obj]));
      } else {
        array = JSON.parse(store.getItem(key));
        console.log(key);
        console.log(obj);
        array.push(obj);
        store.setItem(key, JSON.stringify(array));
      }
    }

    return {
      getStorage: getStorage,
      setStorage: setStorage
    };
  });
