angular.module('pinboardApp')
  .controller('BoardsIndexController', BoardsIndexController)
  .controller('BoardsNewController', BoardsNewController)
  .controller('BoardsShowController', BoardsShowController)
  .controller('BoardsEditController', BoardsEditController);

BoardsIndexController.$inject = ['Board'];
function BoardsIndexController(Board) {
  const boardsIndex = this;

  boardsIndex.all = Board.query();
}

BoardsNewController.$inject = ['Board', '$state'];
function BoardsNewController(Board, $state) {
  const boardsNew = this;

  boardsNew.board = {};

  function create() {
    Board.save(boardsNew.board, () => {
      $state.go('boardsIndex');
    });
  }

  boardsNew.create = create;
}

BoardsShowController.$inject = ['Board', '$state', '$auth'];
function BoardsShowController(Board, $state, $auth) {
  const boardsShow = this;

  boardsShow.board = Board.get($state.params);

  function deleteBoard() {
    boardsShow.board.$remove(() => {
      $state.go('boardsIndex');
    });
  }

  boardsShow.delete = deleteBoard;
  boardsShow.isLoggedIn = $auth.isAuthenticated;
}

BoardsEditController.$inject = ['Board', '$state'];
function BoardsEditController(Board, $state) {
  const boardsEdit = this;

  boardsEdit.board = Board.get($state.params);

  function update() {
    boardsEdit.board.$update(() => {
      $state.go('boardsShow', $state.params);
    });
  }

  this.update = update;

}
