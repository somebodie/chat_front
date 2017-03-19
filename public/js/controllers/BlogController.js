angular.module('ChattyBlog')
    .controller('BlogController', BlogController)

function BlogController($http, $state, $scope, $rootScope) {
    var self = this;
    var server = 'https://still-sea-45460.herokuapp.com';
    // console.log("LET'S BLOG THIS!");
    self.single = [];

    $rootScope.$on('adminLoggedIn', function (event, admin) {
      console.log(admin); // 'currentUser'
       self.admin = admin.admin;
      //  console.log(currentAdmin);
    });

    $scope.$on('userLoggedOut', function(event, data) {
    self.admin = null;
    });

    showBlog();

    // blogs GET    /blogs(.:format)                       blogs#index
    function showBlog() {
      // console.log('SHOWING THIS!');
      $http.get(`${server}/blogs`)
      .then(function (response) {
        // console.log(response);
        self.blogs = response.data
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
      $http.post(`${server}/blogs`, { blog: newBlog})
        .then(function (response) {
          console.log('I SAVED!');
          console.log(response);
          newBlog = {}
        })
    }

    //   blog GET    /blogs/:id(.:format)                   blogs#show
    function getBlog(blog_id) {
      console.log('I SEE YOU!');
      $http.get(`${server}/blogs/${blog_id}`)
        .then(function (response) {
          console.log(response.data);
          self.single = response.data;

          $state.go('article', {article_id: blog_id})
        })
    }

    //        PATCH  /blogs/:id(.:format)                   blogs#update
    function updateBlog(article) {
      console.log("OOPS! LET'S CHANGE THAT");
      // self.update = true; FIXME: make sure that I want to hide
      console.log(article);
      self.article = article;
      $http.patch(`${server}/blogs/:id`)
        .then(function (response) {
          console.log(response);
          console.log('GOT YOU!');
        })
    }



    //        DELETE /blogs/:id(.:format)                   blogs#destroy
    function deleteBlog(id) {
      console.log('BYE BLOG!');
      $http.delete(`${server}/blogs/${id}`)
        .then(function (response) {
          console.log('DELETED!');
          console.log(response);
        })
        // $state.go('articles')
        // FIXME: Make sure that remainder of blogs show after delete
    }

    self.showBlog = showBlog;
    self.createBlog = createBlog;
    self.getBlog = getBlog;
    self.updateBlog = updateBlog;
    self.deleteBlog = deleteBlog;
}
