angular.module('ChattyBlog')
    .controller('BlogController', BlogController)

function BlogController($http, $state, $scope, $rootScope) {
    var self = this;
    var server = 'https://chattyblog-back.herokuapp.com/';
    // console.log("LET'S BLOG THIS!");
    self.selectedBlog = {author: 'Audrey'};
    self.testMessage = 'TESTING'

    $rootScope.$on('adminLoggedIn', function(event, admin) {
        console.log(admin); // 'currentUser'
        self.admin = admin.admin;
        //  console.log(currentAdmin);
    });

    $scope.$on('userLoggedOut', function(event, data) {
        self.admin = null;
    });

    var blog_id = location.hash.split('/')[3];

    // blogs GET    /blogs(.:format)                       blogs#index
    function showBlog() {
        // console.log('SHOWING THIS!');
        $http.get(`${server}/blogs`)
            .then(function(response) {
                // console.log(response);
                self.blogs = response.data;
                // console.log(self.blogs);
            })
    }

    //        POST   /blogs(.:format)                       blogs#create
    function createBlog(newBlog) {
        // console.log(newBlog);
        // console.log(currentAdmin);
        newBlog.author = self.admin.name;
        newBlog.user_id = self.admin.id;
        console.log("LET'S START BLOGGING!");
        // self.newBlog.media = new FileUploader(newBlog.media);
        // https://github.com/nervgh/angular-file-upload/wiki/Introduction
        $http.post(`${server}/blogs`, {
                blog: newBlog
            })
            .then(function(response) {
                console.log('I SAVED!');
                console.log(response);
            })
            newBlog = {}
    }

    //   blog GET    /blogs/:id(.:format)                   blogs#show
    function getBlog(blog) {
      console.log('I SEE YOU!');
      console.log(blog);
      self.selectedBlog = blog;
      console.log(self.selectedBlog);
      // $http.get(`${server}/blogs/${blog.id}`)
      //   .then(function (response) {
      //     console.log(response);
      //     self.selectedBlog = response.data;
      //
      //     $state.go('article', {article_title: blog.title})
      //   })
    // } FIXME figure out how to get indiviudal blog to show on page
  }

    //        PATCH  /blogs/:id(.:format)                   blogs#update
    function updateBlog(currentBlog) {
        console.log("OOPS! LET'S CHANGE THAT");
        // self.update = true; FIXME: make sure that I want to hide
        console.log(currentBlog);
        currentBlog.author = currentBlog.name;
        currentBlog.user_id = currentBlog.id;
        $http.patch(`${server}/blogs/${currentBlog.id}`, {
                blog: currentBlog
            })
            .then(function(response) {
                console.log(response);
                console.log('I GOT YOU THIS IS UPDATED!');
            })
    }

    //        DELETE /blogs/:id(.:format)                   blogs#destroy
    function deleteBlog(blog_id) {
        console.log('BYE BLOG!');
        $http.delete(`${server}/blogs/${blog_id}`)
            .then(function(response) {
                console.log('DELETED!');
            })
        // $state.go('articles')
        // FIXME: Make sure that remainder of blogs show after delete
    }

    showBlog();

    self.showBlog = showBlog;
    self.createBlog = createBlog;
    self.getBlog = getBlog;
    self.updateBlog = updateBlog;
    self.deleteBlog = deleteBlog;
}
