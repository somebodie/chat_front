angular.module('ChattyBlog')
    .controller('CommentController', CommentController)

function CommentController($http, $state, $scope, $rootScope) {
    var self = this;
    var server = 'https://chattyblog-back.herokuapp.com';
    console.log("GOT THIS COMMENT TO MAKE!");
    self.comments = {};

    $scope.$on('userLoggedIn', function(event, currentUser) {
        console.log(currentUser); // 'currentUser'
        self.currentUser = currentUser;
    });

    $scope.$on('userLoggedOut', function(event, data) {
        self.currentUser = null;
    });

    var blog_id = location.hash.split('/')[3];
    var comment_id = location.hash.split('/')[5];

    // TODO: https://toddmotto.com/all-about-angulars-emit-broadcast-on-publish-subscribing/

    // blog_comments GET    /blogs/:blog_id/comments(.:format)     comments#index
    function getComments(blog_id) {
        console.log('GETTING COMMENTS');
        var blog.id = blog_id;
        $http.get(`${server}/blogs/${blog.id}/comments`)
            .then(function(response) {
                console.log(response);
              self.comments = response.data;
            })
    }

    //  POST   /blogs/:blog_id/comments(.:format)     comments#create
    function makeComment(blog_id) {
        console.log("I GOT SOMETHING TO SAY!");
        $http.post(`${server}/blogs/${blog_id}/comments`)
            .then(function(response) {
                console.log(response);
            // res.json(self.comments)
            })
    }

    //  blog_comment GET    /blogs/:blog_id/comments/:id(.:format) comments#show
    function showComment(blog_id) {
        console.log("LET ME SEE THIS!");
        $http.get(`${server}/blogs/${blog_id}/comments/${comment_id}`)
            .then(function(response) {
                console.log(response);
            })
    }

    //  PATCH  /blogs/:blog_id/comments/:id(.:format) comments#update
    function updateComment(blog_id) {
        console.log("TYPO LET ME CHANGE THAT");
        $http.patch(`${server}/blogs/${blog_id}/comments/${comment_id}`)
            .then(function(response) {
                console.log(response);
            })
    }

    //  DELETE /blogs/:blog_id/comments/:id(.:format) comments#destroy
    function deleteComment(blog_id) {
        console.log("THAT'S NOT GOING TO WORK!");
        $http.delete(`${server}/blogs/${blog_id}/comments/${comment_id}`)
            .then(function(response) {
                console.log(response);
            })
    }

    getComments(blog_id);

    self.getComments = getComments;
    self.makeComment = makeComment;
    self.showComment = showComment;
    self.updateComment = updateComment;
    self.deleteComment = deleteComment;
}
