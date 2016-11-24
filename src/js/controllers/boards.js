angular.module('pinboardApp')
  .controller('BoardsIndexController', BoardsIndexController)
  .controller('BoardsNewController', BoardsNewController)
  .controller('BoardsShowController', BoardsShowController)
  .controller('BoardsEditController', BoardsEditController)
  .controller('BoardsProfileController', BoardsProfileController);

BoardsIndexController.$inject = ['Board'];
function BoardsIndexController(Board) {
  const boardsIndex = this;

  boardsIndex.all = Board.query();
}

BoardsProfileController.$inject = ['Board', '$auth'];
function BoardsProfileController(Board, $auth) {
  const boardsProfile = this;
  const currentUser = $auth.getPayload()._id;
  boardsProfile.testing = 'Hello';

  boardsProfile.all = Board.query({user: currentUser});
}

BoardsNewController.$inject = ['Board', '$state', '$auth'];
function BoardsNewController(Board, $state, $auth) {
  const boardsNew = this;
  const currentUser = $auth.getPayload()._id;

  boardsNew.board = {};
  boardsNew.board.user = currentUser;

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
  const currentUser = $auth.getPayload()._id;
  boardsShow.pin = {};
  boardsShow.formVisible = false;
  boardsShow.toggleForm = toggleForm;

  function toggleForm() {
    console.log('clicked');
    boardsShow.formVisible = boardsShow.formVisible ? false : true;
  }

  Board.get($state.params).$promise.then((board) => {
    boardsShow.board = board;
    boardsShow.user = board.user;
  });

  function deleteBoard() {
    boardsShow.board.$remove(() => {
      $state.go('boardsIndex');
    });
  }

  function createPin(){
    boardsShow.board.pins.push(boardsShow.pin);
    boardsShow.board.$update(() => {
      boardsShow.pin = {};
    });
  }

  function like(pin) {
    if (pin.likes.indexOf(currentUser) === -1) {
      pin.likes.push(currentUser);
    } else {
      const index = pin.likes.indexOf(currentUser);
      pin.likes.splice(index, 1);
    }
    boardsShow.board.$update();
  }

  boardsShow.delete = deleteBoard;
  boardsShow.createPin = createPin;
  boardsShow.like = like;
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
