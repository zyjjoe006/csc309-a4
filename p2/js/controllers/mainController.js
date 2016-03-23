// controllers
app.controller('ProjectController', ['projectDetail', '$scope', '$stateParams', function(projectDetail, $scope,$stateParams) {
    // id needs to be passed by routeparam 
    id=String($stateParams.projectId);
    projectDetail.getProject(id).success(function(data) {
        $scope.project = data;
        $scope.project.publishDate = new Date($scope.project.publishDate);
        $scope.project.dueDate = new Date($scope.project.dueDate);
    });
    this.state = 0;
    this.setState = function(setState) {
        this.state = setState;
    }
    this.isSelected = function(checkState) {
        return this.state == checkState;
    }

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



var users = [{

}];