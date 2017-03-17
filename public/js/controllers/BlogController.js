angular.module('ChattyBlog')
    .controller('BlogController', BlogController);


function BlogController($http, $state, $scope, $rootScope) {
    var self = this;
    var server = 'https://still-sea-45460.herokuapp.com';
    console.log("LET'S BLOG THIS!");
    var blogs = {};

    // blogs GET    /blogs(.:format)                       blogs#index
    function showBlog() {
      // console.log('SHOWING THIS!');
      $http.get(`${server}/blogs`)
      .then(function (response) {
        // console.log(response);
        self.blogs = response.data
        console.log(self.blogs);
      })
    }

    //        POST   /blogs(.:format)                       blogs#create
    function createBlog() {
      console.log("LET'S START BLOGGING!");
    }

    self.showBlog = showBlog;
}

//   blog GET    /blogs/:id(.:format)                   blogs#show
//        PATCH  /blogs/:id(.:format)                   blogs#update
//        PUT    /blogs/:id(.:format)                   blogs#update
//        DELETE /blogs/:id(.:format)                   blogs#destroy
