app.factory('projectDetail', ['$http', function($http) {
    return {
        getProject: function(projectId) {
            console.log("id in ajax:");
            console.log(projectId);
            return $http({method: "get", url: "/postingManager/api/view_detail", params: {id:projectId,_id:projectId}})
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
    return $http.get('/postingManager/viewAllPost')
        .success(function(data) {
            console.log(data);
            return data;
        })
        .error(function(err) {
            return err;
        });
}]);

app.factory('createNewUser', ['$http', function($http) {
    return {
        newUser: function(data) {
            $http.post('/signup',data)
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });
        }
    };
}]);








// check if logged in
app.factory('UserService', [function() {
    var sdo = {
        isLogged: false,
        username: '',
    };
    return sdo
}]);


app.controller('loginCtrl', ['$scope', '$http', 'UserService', function($scope, $http, User) {
    $scope.login = function() {
        // var config();
        $http(config)
            .success(function(data, status, headers, config) {
                if (data.status) {
                    // successful login
                    User.isLogged = true;
                    User.username = data.username;
                } else {
                    User.isLogged = false;
                    User.username = "";
                }
            })
            .error(function(data, status, headers, congig) {
                User.isLogged = false;
                User.username = "";
            })
    }
}]);
