angular.module('ManagerDataStore')
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'home/home.view.html',
                    controller: 'HomeCtrl',
                    controllerAs: 'home'
                });
        }
    ]);
