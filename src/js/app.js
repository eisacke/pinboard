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
    .state('profile', {
      url: '/profile',
      templateUrl: '/templates/boards/profile.html',
      controller: 'BoardsProfileController as boardsProfile'
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
    })
    .state('boardsShow', {
      url: '/boards/:id',
      templateUrl: '/templates/boards/show.html',
      controller: 'BoardsShowController as boardsShow'
    })
    .state('boardsEdit', {
      url: '/boards/:id/edit',
      templateUrl: '/templates/boards/edit.html',
      controller: 'BoardsEditController as boardsEdit'
    });

  $urlRouterProvider.otherwise('/');
}

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';

  $authProvider.tokenPrefix = '';
}
