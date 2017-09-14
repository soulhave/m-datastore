angular.module('ManagerDataStore')
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
