// var app = angular.module('coding', ['ngRoute']);
// var app = angular.module('coding', []);

// app.config(['$routeProvider',
//     function($routeProvider) {
//         $routeProvider.
//         	when('/',{
//         		templateUrl:'find_project.html',
//         	}).
//             when('/project_detail/:projectId', {
//                 templateUrl: 'project_detail.html',
//             }).
//             // when('/products/:productId', {
//             //     templateUrl: 'partials/detail.html',
//             //     controller: 'DetailCtrl'
//             // }).
//             otherwise({
//                 redirectTo: '/'
//             });
//     }]);
var app = angular.module('coding', ['ui.router']);
app.config(["$locationProvider", function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('find_project', {
    	url:'/',
        templateUrl: 'find_project.html'
    })
    .state('project_detail',{
    	url:'/project/:projectId',
    	templateUrl:'project_detail.html',
    	
    });
    
}]);