angular.module('ChattyBlog', ['ui.router'])
    .config(ChatRouter)
    .config(authInterceptor)

function authInterceptor($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor')
}

ChatRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function ChatRouter($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        // **INDEX STATE**
        .state('index', {
            url: '/',
        })
        // **USER STATES**
        // .state('home', {
        //     url: '/home',
        //     templateUrl: '/partials/home.html',
        // })
        .state('blogs', {
            url: '/blog',
            templateUrl: '/partials/users/blog.html',
        })
        .state('article', {
            url: '/blog/article/:article_id', //https://github.com/angular-ui/ui-router/issues/928
            templateUrl: '/partials/users/article.html',
        })
        // **ADMIN STATES**
        .state('admin', {
            url: '/admin',
            templateUrl: '/partials/admin/admin.html',
        })
        .state('new', {
            url: '/new',
            templateUrl: 'partials/admin/new.html',
            // parent: 'list'
        })
        .state('update', {
            url: '/update',
            templateUrl: 'partials/admin/update.html',
            // parent: 'list'
        });

    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });
}
