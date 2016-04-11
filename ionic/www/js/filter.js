angular.module('starter.filter', [])

  .filter('described', function() {
    return function(items) {
      return items.map(function(item) {
        if (item.type === 'feeding') {
          item.type = 'Dianel got hungry, so we fed him';
        } else {
          item.type = 'Oops, he do it again, so we dress him a new diaper';
        }
        return item;
      });
    };
  });
