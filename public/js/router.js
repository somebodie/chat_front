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
    .state('blogs', {
      url: '/blogs',
      templateUrl: '/partials/users/entry.html',
      controller: 'CommentController as comments'
    })
    // **ADMIN STATES**
    .state('list', {
      url: '/admin/articles',
      templateUrl: '/partials/admin/list.html',
      controller: 'BlogController as blog'
    })
    .state('article', {
      url: '/:id',
      templateUrl: '/partials/admin/article.html',
      controller: 'BlogController as blog',
      parent: 'list'
    })
    .state('new',{
      url: 'admin/articles/new',
      templateUrl: 'partials/admin/new.html',
      controller: 'BlogController as blog'
    })
}
