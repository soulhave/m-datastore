angular.module('helloWorldApp', [
    'ngRoute', 'ngMaterial', 'ngMaterialSidemenu'
]).config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('red')
        .accentPalette('indigo');
}).constant('_', window._)
    .run(function ($rootScope) {
     $rootScope._ = window._;
  });

angular.module('helloWorldApp')
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

angular.module('helloWorldApp')
    .filter('isEmpty', function () {
        return function (obj) {
            return (obj && Object.keys(obj).length === 0);
        };
    }).filter('isNotEmpty', function () {
        return function (obj) {
            return !(obj && Object.keys(obj).length === 0);
        };
    });
angular.module('helloWorldApp')
    .service('HomeService', function () {
        /**
         * Return all existent namespaces.
         */
        this.getNameOfNamespaces = function () {
            return [
                { id: 1, namespace: 'develop' },
                { id: 2, namespace: 'production' },
                { id: 3, namespace: 'stage' },
                { id: 4, namespace: 'xpto' },
                { id: 5, namespace: 'zasw' }
            ]
        };

        /**
         * Return all existent kinds by namespace
         */
        this.getKindByNamespace = function (namespacesSelected) {
            var res = [
                { id: 1, name: 'Submission', namespace: 'production' },
                { id: 2, name: 'Submission', namespace: 'develop' },
                { id: 3, name: 'Submission', namespace: 'stage' },
                { id: 11, name: 'Question', namespace: 'production' },
                { id: 12, name: 'Question', namespace: 'develop' },
                { id: 13, name: 'Template', namespace: 'stage' },
                { id: 21, name: 'Option', namespace: 'production' },
                { id: 22, name: 'Team', namespace: 'develop' },
                { id: 23, name: 'Team', namespace: 'stage' },                
            ]

            if (namespacesSelected && namespacesSelected.length > 0) {
                var res_filtered = [];
                var ns_local;
                var i = 0;
                var select = function (it) {
                    if (it.namespace === ns_local)
                            return true;
                    };

                while (namespacesSelected[i]) {
                    ns_local = namespacesSelected[i].namespace;
                    res_filtered = res_filtered.concat(res.filter(select));
                    i++;
                }
                return res_filtered;
            }
            return [];
        }
    });

angular.module('helloWorldApp')
    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav) {
        $scope.toggleLeft = buildToggler('left');

        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        };
    });

angular.module('helloWorldApp')
    .controller('HomeCtrl', ['$scope', 'HomeService', function ($scope, service) {
        this.selectedNamespaces = [];
        this.namespaceList = service.getNameOfNamespaces();
        this.kinds = [];
        this.isSelectedtAllKinds = false;
        this.isSelectedtAllKindsAriaLabel = 'Select';

        /**
         * Update the field kinds;
         */
        this.refreshKinds = function() {
            this.kinds = service.getKindByNamespace(this.selectedNamespaces);
        };

        /**
         * Select all namespaces;
         */
        this.selectAllNamespaces = function () {
            this.selectedNamespaces = this.namespaceList;
        };
        
        /**
         * Clean all namespaces;
         */
        this.cleanAllNamespaces = function () {
            this.selectedNamespaces = [];
        };
        
        /**
         * Is everything selected;
         */
        this.isAllNamespaceSelected = function () {
            return this.selectedNamespaces.length === this.namespaceList.length;
        }
        
        /**
         * Is everything selected;
         */
        this.isAllKindSelected = function () {
            var filteredKinds = this.selectedKinds();

            if(filteredKinds.length != this.kinds.length){
                this.isSelectedtAllKinds = false;
            }else{
                this.isSelectedtAllKinds = true;
            }
        }
        
        /**
         * Some kind selected.
         */
        this.selectedKinds = function () {
            var countFilter = function (v){
                if(v && _.has(v,'selected') && v.selected === true){
                    return true;
                }
            };

            return this.kinds.filter(countFilter);
        }

        /**
         * Has some kind selected.
         */
        this.hasSomeKindSelected = function () {
            return this.selectedKinds().length > 0;
        }
        /**
         * Select all kinds.
         */
        this.selectAllKinds = function () {
            var state = this.isSelectedtAllKinds;
            
            var selectAll = function(v){
                v.selected = state;
                return v;
            }
            
            this.kinds = this.kinds.map(selectAll);
        }

    }]);
