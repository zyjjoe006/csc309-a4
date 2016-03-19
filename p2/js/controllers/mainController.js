// controllers
app.controller('ProjectController', ['projectDetail', '$scope', function(projectDetail, $scope) {
    // fake data
    // $scope.projects = projects;
    projectDetail.success(function(data) {
        $scope.projects = data;
        $scope.project = $scope.projects[0];
        angular.forEach($scope.projects, function(value) {
            value.publishDate = new Date(value.publishDate);
            value.dueDate = new Date(value.dueDate);

        });
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

app.controller('ProjectListController',function(){

})



var users = [{

}];



