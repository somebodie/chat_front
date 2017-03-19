angular.module('ChattyBlog', ['ui.router'])
    .config(ChatRouter)
    .config(authInterceptor)

function authInterceptor($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor')
}

ChatRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function ChatRouter($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        // **INDEX STATE**
        .state('index', {
            url: '/',
        })
        // **USER STATES**
        .state('home', {
            url: '/home',
            templateUrl: '/partials/home.html',
            controller: 'BlogController as blog',
        })
        .state('blogs', {
            url: '/blog',
            templateUrl: '/partials/users/blog.html',
            controller: 'BlogController as blog',
        })
        .state('article', {
            url: 'blog/:article_id', //https://github.com/angular-ui/ui-router/issues/928
            templateUrl: '/partials/users/article.html',
            controller: 'BlogController as blog',
        })
        // **ADMIN STATES**
        .state('admin', {
            url: '/admin/',
            templateUrl: '/partials/admin/list.html',
            controller: 'BlogController as blog'
        })
        .state('new', {
            url: '/new',
            templateUrl: 'partials/admin/new.html',
            controller: 'BlogController as blog',
            parent: 'list'
        });
        .state('update', {
            url: '/update',
            templateUrl: 'partials/admin/new.html',
            controller: 'BlogController as blog',
            parent: 'list'
        });

    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });
}
