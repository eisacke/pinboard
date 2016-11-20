angular
  .module('pinboardApp', ['ngResource', 'ui.router', 'satellizer'])
  .config(Router)
  .config(Auth);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/templates/home.html'
      // controller: 'LoginController as login'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('boardsIndex', {
      url: '/boards',
      templateUrl: '/templates/boards/index.html',
      controller: 'BoardsIndexController as boardsIndex'
    })
    .state('boardsNew', {
      url: '/boards/new',
      templateUrl: '/templates/boards/new.html',
      controller: 'BoardsNewController as boardsNew'
    });

  $urlRouterProvider.otherwise('/');
}

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';

  $authProvider.tokenPrefix = '';
}
