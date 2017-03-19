angular.module('ChattyBlog')
    .controller('CommentController', CommentController)

function CommentController($http, $state, $scope, $rootScope) {
    var self = this;
    var server = 'https://still-sea-45460.herokuapp.com';
    console.log("GOT THIS COMMENT TO MAKE!");

    // $scope.on('userLoggedIn', function (event, currentUser) {
    //   console.log(currentUser); // 'currentUser'
    //   self.currentUser = currentUser;
    // });
    //
    // $scope.$on('userLoggedOut', function(event, data) {
    //   self.currentUser = null;
    // });

    // TODO: https://toddmotto.com/all-about-angulars-emit-broadcast-on-publish-subscribing/

    // blog_comments GET    /blogs/:blog_id/comments(.:format)     comments#index
    function getComments() {
        console.log('GETTING COMMENTS');
        blog();
    }

    //               POST   /blogs/:blog_id/comments(.:format)     comments#create
    function makeComment() {
        console.log("I GOT SOMETHING TO SAY!");
    }

    //  blog_comment GET    /blogs/:blog_id/comments/:id(.:format) comments#show
    function showComment() {
        console.log("LET ME SEE THIS!");
    }

    //               PATCH  /blogs/:blog_id/comments/:id(.:format) comments#update
    function updateComment() {
        console.log("TYPO LET ME CHANGE THAT");
    }

    //               DELETE /blogs/:blog_id/comments/:id(.:format) comments#destroy
    function deleteComment() {
        console.log("THAT'S NOT GOING TO WORK!");
    }

    self.getComments = getComments;
    self.makeComment = makeComment;
    self.showComment = showComment;
    self.updateComment = updateComment;
    self.deleteComment = deleteComment;
}
