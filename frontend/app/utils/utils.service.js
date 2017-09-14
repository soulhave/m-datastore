angular.module('ManagerDataStore')
    .service('UtilService', ['$mdDialog', function ($mdDialog) {

        /**
         * Hide the loading screen.
         */
        this.hideLoading = function () {
            $mdDialog.hide();
        }

        /**
         * Show the load screen.
         */
        this.showLoading = function () {
            $mdDialog.show({
                template: '<md-dialog id="plz_wait" style="background-color:transparent;box-shadow:none">' +
                            '<div layout="row" layout-sm="column" layout-align="center center" aria-label="wait">' +
                                '<md-progress-circular md-mode="indeterminate" ></md-progress-circular>' +
                            '</div>' +
                         '</md-dialog>',
                parent: angular.element(document.body),
                clickOutsideToClose:false,
                fullscreen: true
              });
        };
    }]);