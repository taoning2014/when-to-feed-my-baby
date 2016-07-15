(function () {
  angular.module('starter.filter', [])
    .filter('described', described);

  function described() {
    return function (items) {
      if (!items || items.length === 0) {
        return [];
      }
      return items.map(function (item) {
        if (item.feeding !== 0) {
          item.type = 'We fed Daniel: ' + item.feeding + ' ml';
          item.img = 'feeding.png';
        } else {
          item.type = 'We dress Daniel a new diaper';
          item.img = 'changing.png';
        }
        return item;
      });
    };
  }
})();
