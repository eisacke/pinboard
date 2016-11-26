"use strict";function Router(e,r){e.state("home",{url:"/",templateUrl:"/templates/home.html"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("profile",{url:"/profile",templateUrl:"/templates/boards/profile.html",controller:"BoardsProfileController as boardsProfile"}).state("boardsIndex",{url:"/boards",templateUrl:"/templates/boards/index.html",controller:"BoardsIndexController as boardsIndex"}).state("boardsNew",{url:"/boards/new",templateUrl:"/templates/boards/new.html",controller:"BoardsNewController as boardsNew"}).state("boardsShow",{url:"/boards/:id",templateUrl:"/templates/boards/show.html",controller:"BoardsShowController as boardsShow"}).state("boardsShow.edit",{url:"/edit",views:{"form@boardsShow":{templateUrl:"/templates/boards/forms/editBoard.html"}}}).state("boardsShow.newPin",{url:"/newPin",views:{"form@boardsShow":{templateUrl:"/templates/boards/forms/newPin.html"}}}).state("boardsShow.repin",{url:"/repin",views:{"form@boardsShow":{templateUrl:"/templates/boards/forms/repin.html"}}}),r.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix=""}function RegisterController(e,r){function o(){e.signup(t.user).then(function(){r.go("login")})}var t=this;t.user={},t.submit=o}function LoginController(e,r){function o(){e.login(t.credentials).then(function(){r.go("profile")})}var t=this;t.credentials={},t.submit=o}function Board(e){return new e("/boards/:id",{id:"@_id"},{update:{method:"PUT"}})}function BoardsIndexController(e){var r=this;r.all=e.query()}function BoardsProfileController(e,r){var o=this,t=r.getPayload()._id;o.all=e.query({user:t})}function BoardsNewController(e,r,o){function t(){e.save(n.board,function(){r.go("boardsIndex")})}var n=this,l=o.getPayload()._id;n.board={},n.board.user=l,n.create=t}function BoardsShowController(e,r,o){function t(e){p.board.pins.forEach(function(e){e.active=!1}),p.board.pins[e].active=!p.board.pins[e].active}function n(e){var r=p.board.pins.indexOf(e);p.board.pins.splice(r,1),p.board.$update()}function l(){p.formVisible=!p.formVisible}function i(r){e.query({user:p.currentUser}).$promise.then(function(e){p.userBoards=e,p.selectedPin=r,p.formVisible=!0})}function a(e){e.pins.push(p.selectedPin),e.$update(function(e){r.go("boardsShow",{id:e._id})})}function s(){p.board.pins.push(p.pin),p.board.$update(function(){p.pin={},p.formVisible=!1})}function d(e){if(e.likes.indexOf(p.currentUser)===-1)e.likes.push(p.currentUser);else{var r=e.likes.indexOf(p.currentUser);e.likes.splice(r,1)}p.board.$update()}function u(){p.board.$update(function(){p.formVisible=!1})}function c(){p.board.$remove(function(){r.go("boardsIndex")})}var p=this;p.currentUser=o.getPayload()._id,p.pin={},p.formVisible=!1,p.belongsToUser=!1,p.deletePin=n,p.toggleForm=l,p.delete=c,p.repinPin=a,p.update=u,p.createPin=s,p.repin=i,p.mobile=t,p.like=d,p.isLoggedIn=o.isAuthenticated,e.get(r.params).$promise.then(function(e){p.board=e,p.user=e.user,e.user._id===p.currentUser&&(p.belongsToUser=!0)})}function MainController(e,r,o){function t(){i.menuVisible=!i.menuVisible}function n(){e.logout().then(function(){r.go("home")})}function l(o,t){i.menuVisible=!1,i.message=null,!e.isAuthenticated()&&a.includes(t.name)?(o.preventDefault(),r.go("login"),i.message="You must be logged in to go there!"):e.isAuthenticated()&&"home"===t.name&&(o.preventDefault(),r.go("boardsIndex"))}var i=this;i.isLoggedIn=e.isAuthenticated,i.toggleNav=t,i.menuVisible=!1,i.logout=n,i.message=null;var a=[];o.$on("$stateChangeStart",l)}function Pin(e){return new e("/pins/:id",{id:"@_id"},{update:{method:"PUT"}})}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}angular.module("pinboardApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("pinboardApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("pinboardApp").factory("Board",Board),Board.$inject=["$resource"],angular.module("pinboardApp").controller("BoardsIndexController",BoardsIndexController).controller("BoardsNewController",BoardsNewController).controller("BoardsShowController",BoardsShowController).controller("BoardsProfileController",BoardsProfileController),BoardsIndexController.$inject=["Board"],BoardsProfileController.$inject=["Board","$auth"],BoardsNewController.$inject=["Board","$state","$auth"],BoardsShowController.$inject=["Board","$state","$auth"],angular.module("pinboardApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("pinboardApp").factory("Pin",Pin),Pin.$inject=["$resource"],angular.module("pinboardApp").factory("User",User),User.$inject=["$resource"];
//# sourceMappingURL=app.js.map
