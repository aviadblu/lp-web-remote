(function (window, angular) {
    'use strict';

    angular
        .module('services', [

        ]);

    angular
        .module('factories', [

        ]);

    angular
        .module('controllers', [
            'controllers.signin',
            'controllers.dashboard'
        ]);

    angular
        .module('filters', [

        ]);

    angular
        .module('constants', [

        ]);

    angular
        .module('directives', [

        ]);


    angular
        .module('appParts', [
            'services',
            'factories',
            'controllers',
            'filters',
            'constants',
            'directives'
        ])

        .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {

        }])

        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/signin");
        }]);

})(window, window.angular);
