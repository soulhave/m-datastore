angular.module('ManagerDataStore')
    .controller('HomeCtrl', ['$scope', 'HomeService', 'UtilService', function ($scope, service, util) {
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

        /**
         * Show dialog and close.
         */
        this.showWaiting = function () {
            console.log("...");
            util.showLoading();
            setTimeout(util.hideLoading, 4000);
        }

    }]);
