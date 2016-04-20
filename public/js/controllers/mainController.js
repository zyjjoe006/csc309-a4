// controllers
app.controller('ProjectController', ['projectDetail', '$scope', '$stateParams','$location', function(projectDetail, $scope, $stateParams,$location) {
    // id needs to be passed by routeparam 
    // id = $stateParams;
    id=$location.url().substring(31);
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
        $scope.project = angular.copy($scope.initial);
        $scope.reset = function() {
            angular.copy($scope.initial, $scope.project);

        };
        $scope.change = function() {
            angular.copy($scope.project, $scope.initial)
        }
    });



}]);

app.controller('DiscussionController', function() {
    this.discussion = {};
    this.addDiscussion = function(project) {
        // need to change
        this.discussion.author = "Me";
        // this.discussion.createdOn = Date.now();
        this.discussion.createdOn = new Date();
        project.discussions.push(this.discussion);
        this.discussion = {};
    }
});

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




