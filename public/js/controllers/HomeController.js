angular.module('ChattyBlog')
    .controller('HomeController', HomeController);


function HomeController($http, $state, $scope, $rootScope, AuthTokenFactory, $location) {
    var self = this;
    var server = 'https://chattyblog-back.herokuapp.com/';
    self.control = false; //until admin user.admin is true
    $scope.$location = $location;

    function login(userPass) {
        $http.post(`${server}/users/login`, {
                user: userPass
            })
            .then(function(response) {
                AuthTokenFactory.setToken(response.data.token)
                console.log(response);
                $scope.$parent.$broadcast('userLoggedIn', {
                    currentUser: response.data.user
                });
                if (response.data.user.admin) {
                    $rootScope.$broadcast('adminLoggedIn', {
                        admin: response.data.user,
                        token: response.data.token
                    });
                    console.log('ADMIN LOGGED IN!');
                    self.control = true;
                }
            });
        console.log("This is me login in");
        console.log(userPass);
    }

    function logout() {
        AuthTokenFactory.setToken(); // $state.go(''); FIXME: Decided on where user goes after login, prefer no where so may leave as is
        $scope.$emit('userLoggedOut');
        console.log('logged off');
        self.control = false;
        $state.go('index')
    }

    function signup(userPass) {
        // console.log(userPass);
        $http.post(`${server}/users`, {
                user: userPass
            })
            .then(function(response) {
                login(userPass);
            })
    }

    self.login = login;
    self.logout = logout;
    self.signup = signup;
}
