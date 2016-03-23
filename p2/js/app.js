var app = angular.module('coding', ['ngRoute']);
// var app = angular.module('coding', []);
   
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        	when('/',{
        		templateUrl:'find_project.html',
        	}).
            when('/project/:id', {
                templateUrl: 'project_detail.html',
            }).
            // when('/products/:productId', {
            //     templateUrl: 'partials/detail.html',
            //     controller: 'DetailCtrl'
            // }).
            otherwise({
                redirectTo: '/'
            });
    }]);







 
