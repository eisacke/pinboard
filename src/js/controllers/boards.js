angular.module('pinboardApp')
  .controller('BoardsIndexController', BoardsIndexController)
  .controller('BoardsNewController', BoardsNewController)
  .controller('BoardsShowController', BoardsShowController)
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
  boardsShow.currentUser = $auth.getPayload()._id;
  boardsShow.pin = {};
  boardsShow.formVisible = false;
  boardsShow.belongsToUser = false;
  boardsShow.deletePin = deletePin;
  boardsShow.toggleForm = toggleForm;
  boardsShow.delete = deleteBoard;
  boardsShow.repinPin = repinPin;
  boardsShow.update = update;
  boardsShow.createPin = createPin;
  boardsShow.repin = repin;
  boardsShow.like = like;
  boardsShow.isLoggedIn = $auth.isAuthenticated;

  Board.get($state.params).$promise.then((board) => {
    boardsShow.board = board;
    boardsShow.user = board.user;
    if(board.user._id === boardsShow.currentUser) {
      boardsShow.belongsToUser = true;
    }
  });

  function deletePin(pin) {
    const index = boardsShow.board.pins.indexOf(pin);
    boardsShow.board.pins.splice(index, 1);
    boardsShow.board.$update();
  }

  function toggleForm() {
    boardsShow.formVisible = boardsShow.formVisible ? false : true;
  }

  function repin(pin) {
    Board.query({user: boardsShow.currentUser}).$promise.then((boards) => {
      boardsShow.userBoards = boards;
      boardsShow.selectedPin = pin;
      boardsShow.formVisible = true;
    });
  }

  function repinPin(board) {
    board.pins.push(boardsShow.selectedPin);
    board.$update((board) => {
      $state.go('boardsShow', {id: board._id});
    });
  }

  function createPin(){
    boardsShow.board.pins.push(boardsShow.pin);
    boardsShow.board.$update(() => {
      boardsShow.pin = {};
      boardsShow.formVisible = false;
    });
  }

  function like(pin) {
    if (pin.likes.indexOf(boardsShow.currentUser) === -1) {
      pin.likes.push(boardsShow.currentUser);
    } else {
      const index = pin.likes.indexOf(boardsShow.currentUser);
      pin.likes.splice(index, 1);
    }
    boardsShow.board.$update();
  }

  function update() {
    boardsShow.board.$update(() => {
      boardsShow.formVisible = false;
    });
  }

  function deleteBoard() {
    boardsShow.board.$remove(() => {
      $state.go('boardsIndex');
    });
  }

}
