angular.module('ChattyBlog', ['ui.router'])
.config(ChatRouter)
.config(authInterceptor)

function authInterceptor($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor')
}

ChatRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

function ChatRouter($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/'
    })
}
