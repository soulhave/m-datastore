angular.module('ManagerDataStore')
    .filter('isEmpty', function () {
        return function (obj) {
            return (obj && Object.keys(obj).length === 0);
        };
    }).filter('isNotEmpty', function () {
        return function (obj) {
            return !(obj && Object.keys(obj).length === 0);
        };
    });