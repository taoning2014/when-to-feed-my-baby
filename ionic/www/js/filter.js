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
          item.type = 'Dianel got hungry, so we fed him';
          item.img = 'feeding.png';
        } else {
          item.type = 'Oops, he do it again, so we dress him a new diaper';
          item.img = 'changing.png';
        }
        return item;
      });
    };
  }
})();
