// now it returns the whole list, need to return only one project
// app.factory('projectDetail', ['$http', function($http) { 
//   return $http.get('/data.json') 
//             .success(function(data) { 
//               return data; 
//             }) 
//             .error(function(err) { 
//               return err; 
//             }); 
// }]);
app.factory('projectDetail', ['$http', function($http) {
    return {
        getProject: function(id) {
            return $http.get('/project/id=' + id)
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });
        }
    };
}]);
app.factory('projectList', ['$http', function($http) {
    return $http.get('/project_list')
        .success(function(data) {
            return data;
        })
        .error(function(err) {
            return err;
        });
}]);

