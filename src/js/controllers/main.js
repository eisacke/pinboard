angular.module('pinboardApp')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$rootScope'];
function MainController($auth, $state, $rootScope) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.toggleNav = toggleNav;
  main.menuVisible = false;

  function toggleNav() {
    main.menuVisible = main.menuVisible ? false : true;
  }

  function logout() {
    $auth.logout()
      .then(() => {
        $state.go('home');
      });
  }

  main.logout = logout;

  main.message = null;
  // const protectedStates = ['filmsEdit', 'filmsNew'];
  const protectedStates = [];

  function secureState(e, toState) {
    main.menuVisible = false;
    main.message = null;
    if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
      e.preventDefault();
      $state.go('login');
      main.message = 'You must be logged in to go there!';
    }
  }

  $rootScope.$on('$stateChangeStart', secureState);
}
