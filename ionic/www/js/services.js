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

.factory('ServerStorageFactory', function(UtilityFactory, $http) {
  function getStorage() {
    console.log('Debug: ');
    console.log(UtilityFactory.herokuURL);
    return $http.get(UtilityFactory.herokuURL);
  }

  function setStorage(obj) {
    return $http.post(UtilityFactory.herokuURL, obj);
  }

  function clearStorage(cb) {
    return $http.delete(UtilityFactory.herokuURL).then(cb);
  }

  return {
    getStorage: getStorage,
    setStorage: setStorage,
    clearStorage: clearStorage
  };
})

// this factory get data from local storage and server
// merge duplicate data then sort before serve to controller
.factory('DataFactory', function(LocalStorageFactory, UtilityFactory, $http) {
  function getData(cb) {
    // Todo, merge local and server data together
    console.log(UtilityFactory.herokuURL);
    return $http.get(UtilityFactory.herokuURL).then(function(result) {
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
.factory('UtilityFactory', function() {
  function createObj(keyStr, amountNum) {
    var imgUrl = keyStr + '.png'
    return {
      _id: Date.now(),
      type: keyStr,
      img: imgUrl,
      time: Date.now(),
      amount: amountNum
    };
  }

  function merge(dbData, storageData) {
    var itemArray = Array.prototype.concat.apply([], dbData);

    itemArray = Array.prototype.concat.apply(itemArray, storageData.changingArray);
    itemArray = Array.prototype.concat.apply(itemArray, storageData.feedingArray);

    // remove duplicate elements
    return itemArray
      .sort(function(item1, item2) {
        return item1.time - item2.time })
      .filter(function(item, pos, array) {
        return !pos || item.time !== array[pos - 1].time });
  }

  return {
    createObj: createObj,
    merge: merge,
    localURL: 'http://localhost:3000/api/v1',
    herokuURL: 'https://lychee-pudding-45780.herokuapp.com/api/v1'
  };
});
