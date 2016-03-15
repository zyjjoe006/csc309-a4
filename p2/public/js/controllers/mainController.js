// controllers
app.controller('MainController', ['projectList', '$scope', function(projectList, $scope) {
    // fake data
    // $scope.projects = projects;
    projectList.success(function(data) {
        $scope.projects = angular.fromJson(data);
        angular.forEach($scope.projects, function(value) {
            value.publishDate = new Date(value.publishDate);
            value.dueDate = new Date(value.dueDate);

        });
    });
   

}]);
app.controller('ProjectController', ['$scope', function($scope){
    $scope.project=projects[0];
     $scope.project.publishDate = new Date($scope.project.publishDate);
            $scope.project.dueDate = new Date($scope.project.dueDate);
    this.state=0;
    this.setState=function(setState){
        this.state=setState;
    }
    this.isSelected=function(checkState){
        return this.state==checkState;
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

// fake data
// var projects = [{
//         // need id?
//         name: 'Build responsive website',
//         description: 'build without bootstrap',
//         publishDate: 1457652959209,
//         publishDateStr: '1457652959209',
//         publisher: 'IBM',
//         status: 'recruting',
//         email: 'joey.wall@ibm.com',
//         payment: '1200',
//         requiredSkills: ['NodeJS', 'JS', 'HTML5', 'CSS3'],
//         dueDate: 1458652959209,
//         dueDateStr: '1458652959209',
//         specialRequirement: 'Need a team with more than 4 people',
//         tags: ['NodeJS', 'JS', 'HTML5', 'CSS3'],
//         discussions: [{
//             // need id?
//             body: "If you pay me $3000 I can finish in three days.",
//             // need to change
//             author: "John",
//             createdOn: 1458653959209

//         }, {
//             // need id?
//             body: "No way.",
//             // need to change
//             author: "Joey",
//             createdOn: 1458654959209
//         }]



//     }
//     // ,
// ];
var users = [{

}];


var projects = [{
    "id": 1,
    "name": "Build responsive website",
    "description": "build without bootstrap",
    "publishDate": 1457652959209,
    "publishDateStr": "1457652959209",
    "publisher": "IBM",
    "status": "recruting",
    "email": "joey.wall@ibm.com",
    "payment": "1200",
    "requiredSkills": ["NodeJS", "JS", "HTML5", "CSS3"],
    "dueDate": 1458652959209,
    "dueDateStr": "1458652959209",
    "specialRequirement": "Need a team with more than 4 people",
    "tags": ["NodeJS", "JS", "HTML5", "CSS3"],
    "discussions": [{
        "body": "If you pay me $3000 I can finish in three days.",
        "author": "John",
        "createdOn": 1458653959209
    }, {
        "body": "No way.",
        "author": "Joey",
        "createdOn": 1458654959209
    }]
}]
