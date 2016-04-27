// controllers
app.controller('UserController', ['$http', '$scope', function($http, $scope) {
    
    // $http.get()
    $http.get('/api/currentuser').success(function(data) {
        console.log(data.user);
        $scope.user = data.user;
        if ($scope.user != null) {
            $scope.loggedIn = true;
        }
        else{
            $scope.loggedIn = false;
        }

        $scope.showPic = function() {
            if ($scope.loggedIn && $scope.user.profile.picture) {
                return $scope.user.profile.picture
            } else {
                return 'https://gravatar.com/avatar/?s=60&d=retro'
            }


        };
        $scope.isLoeggedIn = function() {
            return $scope.loggedIn;
        }
    });
    // state = 1 when logged in


    // this.setState = function(setState) {
    //     this.state = setState;
    // };
    // this.isSelected = function(checkState) {
    //     return this.state == checkState;
    // };
    // this.query = {};
    // // formState = 1 in the login form
    // this.formState = 0;
    // this.setFormState = function(setState) {
    //     this.formState = setState;
    // };
    // this.isFormSelected = function(checkState) {
    //     return this.formState == checkState;
    // };
    // this.submitSignUpForm = function() {
    //     var data = [];
    //     data.query = this.query;
    //     createNewUser.newUser(data).success(function() {
    //         this.state = 1;
    //     });
    // }
}]);
app.controller('ProjectController', ['projectDetail', '$scope', '$http', function(projectDetail, $scope, $http) {
    // id needs to be passed by routeparam 
    url=window.location.href;
    id=url.substring(url.indexOf("id=") + 3);
    // console.log('location url:');
    // console.log(id);
    this.state = 0;
    this.setState = function(setState) {
        this.state = setState;
    };
    this.isSelected = function(checkState) {
        return this.state == checkState;
    };
    // get project given id
    projectDetail.getProject(id).success(function(data) {
        $scope.initial = data;
        $scope.initial.posting_date = new Date($scope.initial.posting_date);
        $scope.initial.start_date = new Date($scope.initial.start_date);
        $scope.initial.end_date = new Date($scope.initial.end_date);

        $scope.skills = {};
        angular.forEach($scope.initial.tags, function(value) {
            $scope.skills[value] = true;
        });



        $scope.project = angular.copy($scope.initial);
        $scope.project.id = $scope.project._id;
        $scope.reset = function() {
            angular.copy($scope.initial, $scope.project);

        };
        $scope.change = function() {
            $scope.project.tags = [];
            angular.forEach($scope.skills, function(value, key) {
                console.log("Now is");
                console.log(key);
                console.log("its value is");
                console.log(value);
                if (value) {
                    console.log(key);
                    console.log("is ture, thus added");
                    $scope.project.tags.push(key);
                };
            });
            angular.copy($scope.project, $scope.initial);

            $http.post('/postingManager/updatePosting', $scope.project).then(function successCallback() {
                alert("update succeed");
            }, function errorCallback(err) {
                alert(err);
            });


        }
        $scope.isOwner = function() {
            return $scope.project.owner_email == $scope.user.email;
        };
        $scope.join = function() {
            $http.get('/postingManager/joinpost', { params: { id: id } }).then(function successCallback() {
                alert("join succeed");
                $scope.project.developer_email.push($scope.user.email.toLowerCase());
            }, function errorCallback(err) {
                alert(err);
            });
        };
        $scope.quit = function() {
            $http.get('/postingManager/unjoin', { params: { id: id } }).then(function successCallback() {
                alert("quit succeed");
                $scope.project.developer_email.splice($scope.project.developer_email.indexOf($scope.user.email), 1)
            }, function errorCallback(err) {
                alert(err);
            });
        };
    });

    this.comment = {};
    this.addDiscussion = function(project) {
        console.log("going to add comment");

        this.comment.commenter_email = $scope.user.email;
        console.log(this.comment.commenter_email);
        // this.comment.createdOn = Date.now();
        this.comment.comment_date = new Date();
        project.comments.push(this.comment);
        this.comment = {};
    }


    this.allskills = ["HTML5", "CSS3", "JavaScript", "NodeJS/ExpressJS", "MongoDB/Mongoose", "PHP", "Core Java", "SQL", "XML", " Python", "C/C++", "Visual Basic", "Android", "IOS"];

    // to the previous page
    $scope.doTheBack = function() {
        window.history.back();
    };

    $scope.rated = false;
    $scope.rateUp = function() {
        $scope.project.rating += 1;
        var voteValue = 1;
        var data = {
            id: $scope.project.id,
            vote: voteValue
        };
        $http.post('vote', data).then(function successCallback() {
            alert("update rating succeed");
            $scope.rated = true;
        }, function errorCallback(err) {
            alert(err);
        });
    };
    $scope.rateDown = function() {
        $scope.project.rating -= 1;
        var voteValue = 2;
        var data = {
            id: $scope.project.id,
            vote: voteValue
        };
        $http.post('vote', data).then(function successCallback() {
            alert("update rating succeed");
            $scope.rated = true;
        }, function errorCallback(err) {
            alert(err);
        });
    };
}]);


app.controller('ProjectListController', ['projectList', '$scope', function(projectList, $scope) {
    projectList.success(function(data) {
        $scope.projects = data;
    });
}]);

// app.controller('UserController', ['createNewUser', function(createNewUser) {
//     // state = 1 when logged in
//     this.state = 0;
//     this.setState = function(setState) {
//         this.state = setState;
//     };
//     this.isSelected = function(checkState) {
//         return this.state == checkState;
//     };
//     this.query = {};
//     // formState = 1 in the login form
//     this.formState = 0;
//     this.setFormState = function(setState) {
//         this.formState = setState;
//     };
//     this.isFormSelected = function(checkState) {
//         return this.formState == checkState;
//     };
//     this.submitSignUpForm = function() {
//         var data = [];
//         data.query = this.query;
//         createNewUser.newUser(data).success(function() {
//             this.state = 1;
//         });
//     }
// }]);
