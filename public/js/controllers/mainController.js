// controllers
app.controller('ProjectController', ['projectDetail', '$scope', '$stateParams','$http','$location', function(projectDetail, $scope, $stateParams,$http,$location) {
    // id needs to be passed by routeparam 
    // id = $stateParams;
    id=$location.url().substring($location.url().indexOf("id=")+3);
    console.log('location url:');
    console.log(id);
    this.state = 0;
    this.setState = function(setState) {
        this.state = setState;
    };
    this.isSelected = function(checkState) {
        return this.state == checkState;
    };
    projectDetail.getProject(id).success(function(data) {
        $scope.initial = data;
        $scope.initial.posting_date = new Date($scope.initial.posting_date);
        $scope.initial.start_date = new Date($scope.initial.start_date);
        $scope.initial.end_date = new Date($scope.initial.end_date);

        $scope.skills={};
        angular.forEach($scope.initial.tags, function(value){
            $scope.skills[value]=true;
        });



        $scope.project = angular.copy($scope.initial);
        $scope.reset = function() {
            angular.copy($scope.initial, $scope.project);

        };
        $scope.change = function() {
            $scope.project.tags=[];
            angular.forEach($scope.skills, function(value, key){
                console.log("Now is");
                console.log(key);
                console.log("its value is");
                console.log(value);   
                if (value){
                    console.log(key);
                    console.log("is ture, thus added");
                    $scope.project.tags.push(key);
                };
            });
            angular.copy($scope.project, $scope.initial);
            $scope.project.id=$scope.project._id;
            $http.post('/postingManager/updatePosting', $scope.project).then(function successCallback(){
                alert("update succeed");
            }, function errorCallback(err){
                alert(err);
            });
            
            
        }
        $scope.isOwner=function(){
                return $scope.project.owner_email==$scope.user.email;
        };
        $scope.join=function(){
            $http.get('/postingManager/joinpost',{params: {id:id}}).then(function successCallback(){
                alert("join succeed");
                $scope.project.developer_email.push($scope.user.email.toLowerCase());
            }, function errorCallback(err){
                alert(err);
            });
        };
        $scope.quit=function(){
            $http.get('/postingManager/unjoin',{params: {id:id}}).then(function successCallback(){
                alert("quit succeed");
                $scope.project.developer_email.splice($scope.project.developer_email.indexOf($scope.user.email),1)
            }, function errorCallback(err){
                alert(err);
            });
        };
    });
    $http.get('/api/currentuser').success(function(data){
            console.log(data);
            $scope.user=data.user;
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
    this.allskills=["HTML5","CSS3","JavaScript","NodeJS/ExpressJS","MongoDB/Mongoose","PHP","Core Java","SQL","XML"," Python","C/C++","Visual Basic","Android","IOS"];
    
    $scope.doTheBack = function() {
      window.history.back();
    };
}]);


app.controller('ProjectListController', ['projectList', '$scope', function(projectList, $scope) {
    projectList.success(function(data) {
        $scope.projects = data;
    });
}]);

app.controller('UserController',['createNewUser',function(createNewUser){
    // state = 1 when logged in
    this.state=0;
    this.setState = function(setState) {
        this.state = setState;
    };
    this.isSelected = function(checkState) {
        return this.state == checkState;
    };
    this.query={};
    // formState = 1 in the login form
    this.formState=0;
    this.setFormState = function(setState) {
        this.formState = setState;
    };
    this.isFormSelected = function(checkState) {
        return this.formState == checkState;
    };
    this.submitSignUpForm=function(){
        var data=[];
        data.query=this.query;
        createNewUser.newUser(data).success(function(){
            this.state=1;
        });
    }
}]);




