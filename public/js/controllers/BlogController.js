angular.module('ChattyBlog')
    .controller('BlogController', BlogController)


function BlogController($http, $state, $scope, $rootScope) {
    var self = this;
    var server = 'https://still-sea-45460.herokuapp.com';
    // console.log("LET'S BLOG THIS!");
    var blogs = {};
    // IDEA: SELF.ADMIN = false until admin equals user
    //  then ng path to block routes?

    $rootScope.$on('adminLoggedIn', function (event, admin) {
      console.log(admin); // 'currentUser'
       self.admin = admin.admin;
      //  console.log(currentAdmin);
    });

    $scope.$on('userLoggedOut', function(event, data) {
    self.admin = null;
    });


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
        })
    }

    self.showBlog = showBlog;
    self.createBlog = createBlog;
    self.deleteBlog = deleteBlog;
}

//   blog GET    /blogs/:id(.:format)                   blogs#show
//        PATCH  /blogs/:id(.:format)                   blogs#update
//        PUT    /blogs/:id(.:format)                   blogs#update
//        DELETE /blogs/:id(.:format)                   blogs#destroy
