angular.module('ChattyBlog', ['ui.router'])
.config(ChatRouter)
.config(authInterceptor)

function authInterceptor($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor')
}

ChatRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

function ChatRouter($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('index', {
      url: '/',
      controller: 'HomeController as home'
    })
    .state('home', {
      url: '/home',
      templateUrl: '/partials/home.html',
      controller: 'BlogController as blog'
    })
}
