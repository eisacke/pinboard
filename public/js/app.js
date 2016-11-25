"use strict";function Router(e,r){e.state("home",{url:"/",templateUrl:"/templates/home.html"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("profile",{url:"/profile",templateUrl:"/templates/boards/profile.html",controller:"BoardsProfileController as boardsProfile"}).state("boardsIndex",{url:"/boards",templateUrl:"/templates/boards/index.html",controller:"BoardsIndexController as boardsIndex"}).state("boardsNew",{url:"/boards/new",templateUrl:"/templates/boards/new.html",controller:"BoardsNewController as boardsNew"}).state("boardsShow",{url:"/boards/:id",templateUrl:"/templates/boards/show.html",controller:"BoardsShowController as boardsShow"}).state("boardsShow.edit",{url:"/edit",views:{"form@boardsShow":{templateUrl:"/templates/boards/forms/editBoard.html"}}}).state("boardsShow.newPin",{url:"/newPin",views:{"form@boardsShow":{templateUrl:"/templates/boards/forms/newPin.html"}}}).state("boardsShow.repin",{url:"/repin",views:{"form@boardsShow":{templateUrl:"/templates/boards/forms/repin.html"}}}),r.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix=""}function RegisterController(e,r){function o(){e.signup(t.user).then(function(){r.go("login")})}var t=this;t.user={},t.submit=o}function LoginController(e,r){function o(){e.login(t.credentials).then(function(){r.go("profile")})}var t=this;t.credentials={},t.submit=o}function Board(e){return new e("/boards/:id",{id:"@_id"},{update:{method:"PUT"}})}function BoardsIndexController(e){var r=this;r.all=e.query()}function BoardsProfileController(e,r){var o=this,t=r.getPayload()._id;o.testing="Hello",o.all=e.query({user:t})}function BoardsNewController(e,r,o){function t(){e.save(n.board,function(){r.go("boardsIndex")})}var n=this,l=o.getPayload()._id;n.board={},n.board.user=l,n.create=t}function BoardsShowController(e,r,o){function t(e){var r=c.board.pins.indexOf(e);c.board.pins.splice(r,1),c.board.$update()}function n(){c.formVisible=!c.formVisible}function l(r){e.query({user:c.currentUser}).$promise.then(function(e){c.userBoards=e,c.selectedPin=r,c.formVisible=!0})}function i(e){e.pins.push(c.selectedPin),e.$update(function(e){r.go("boardsShow",{id:e._id})})}function a(){c.board.pins.push(c.pin),c.board.$update(function(){c.pin={},c.formVisible=!1})}function s(e){if(e.likes.indexOf(c.currentUser)===-1)e.likes.push(c.currentUser);else{var r=e.likes.indexOf(c.currentUser);e.likes.splice(r,1)}c.board.$update()}function d(){c.board.$update(function(){c.formVisible=!1})}function u(){c.board.$remove(function(){r.go("boardsIndex")})}var c=this;c.currentUser=o.getPayload()._id,c.pin={},c.formVisible=!1,c.belongsToUser=!1,c.deletePin=t,c.toggleForm=n,c.delete=u,c.repinPin=i,c.update=d,c.createPin=a,c.repin=l,c.like=s,c.isLoggedIn=o.isAuthenticated,e.get(r.params).$promise.then(function(e){c.board=e,c.user=e.user,e.user._id===c.currentUser&&(c.belongsToUser=!0)})}function MainController(e,r,o){function t(){i.menuVisible=!i.menuVisible}function n(){e.logout().then(function(){r.go("home")})}function l(o,t){i.menuVisible=!1,i.message=null,!e.isAuthenticated()&&a.includes(t.name)&&(o.preventDefault(),r.go("login"),i.message="You must be logged in to go there!")}var i=this;i.isLoggedIn=e.isAuthenticated,i.toggleNav=t,i.menuVisible=!1,i.logout=n,i.message=null;var a=[];o.$on("$stateChangeStart",l)}function Pin(e){return new e("/pins/:id",{id:"@_id"},{update:{method:"PUT"}})}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}angular.module("pinboardApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("pinboardApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("pinboardApp").factory("Board",Board),Board.$inject=["$resource"],angular.module("pinboardApp").controller("BoardsIndexController",BoardsIndexController).controller("BoardsNewController",BoardsNewController).controller("BoardsShowController",BoardsShowController).controller("BoardsProfileController",BoardsProfileController),BoardsIndexController.$inject=["Board"],BoardsProfileController.$inject=["Board","$auth"],BoardsNewController.$inject=["Board","$state","$auth"],BoardsShowController.$inject=["Board","$state","$auth"],angular.module("pinboardApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("pinboardApp").factory("Pin",Pin),Pin.$inject=["$resource"],angular.module("pinboardApp").factory("User",User),User.$inject=["$resource"];
//# sourceMappingURL=app.js.map
