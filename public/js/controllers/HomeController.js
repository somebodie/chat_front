angular.module('ChattyBlog')
    .controller('HomeController', HomeController);


function HomeController($http, $state, $scope, $rootScope, AuthTokenFactory) {
    var self = this;
    var server = 'https://still-sea-45460.herokuapp.com';

    function login(userPass) {
      $http.post(`${server}/users/login`, {
          user: userPass
            })
        .then(function(response) {
            AuthTokenFactory.setToken(response.data.token)
            });
      console.log("This is me login in");
      console.log(userPass);
    }

    function logout() {
      AuthTokenFactory.setToken();      // $state.go(''); FIXME: Decided on where user goes after login, prefer no where so may leave as is
    }

    function signup(userPass) {
      // console.log(userPass);
      $http.post(`${server}/users`, {
        user: userPass
      })
      .then(function (response) {
        login(userPass);
      })
    }

    self.login = login;
    self.logout = logout;
    self.signup = signup;
}
