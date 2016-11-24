"use strict";function Router(o,e){o.state("home",{url:"/",templateUrl:"/templates/home.html"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("profile",{url:"/profile",templateUrl:"/templates/boards/profile.html",controller:"BoardsProfileController as boardsProfile"}).state("boardsIndex",{url:"/boards",templateUrl:"/templates/boards/index.html",controller:"BoardsIndexController as boardsIndex"}).state("boardsNew",{url:"/boards/new",templateUrl:"/templates/boards/new.html",controller:"BoardsNewController as boardsNew"}).state("boardsShow",{url:"/boards/:id",templateUrl:"/templates/boards/show.html",controller:"BoardsShowController as boardsShow"}).state("boardsEdit",{url:"/boards/:id/edit",templateUrl:"/templates/boards/edit.html",controller:"BoardsEditController as boardsEdit"}),e.otherwise("/")}function Auth(o){o.loginUrl="/login",o.signupUrl="/register",o.tokenPrefix=""}function RegisterController(o,e){function r(){o.signup(t.user).then(function(){e.go("login")})}var t=this;t.user={},t.submit=r}function LoginController(o,e){function r(){o.login(t.credentials).then(function(){e.go("profile")})}var t=this;t.credentials={},t.submit=r}function Board(o){return new o("/boards/:id",{id:"@_id"},{update:{method:"PUT"}})}function BoardsIndexController(o){var e=this;e.all=o.query()}function BoardsProfileController(o,e){var r=this,t=e.getPayload()._id;r.testing="Hello",r.all=o.query({user:t})}function BoardsNewController(o,e,r){function t(){o.save(n.board,function(){e.go("boardsIndex")})}var n=this,l=r.getPayload()._id;n.board={},n.board.user=l,n.create=t}function BoardsShowController(o,e,r){function t(o){var e=i.board.pins.indexOf(o);i.board.pins.splice(e,1),i.board.$update()}function n(){i.formVisible=!i.formVisible}function l(){i.board.pins.push(i.pin),i.board.$update(function(){i.pin={},i.formVisible=!1})}function a(o){if(o.likes.indexOf(s)===-1)o.likes.push(s);else{var e=o.likes.indexOf(s);o.likes.splice(e,1)}i.board.$update()}var i=this,s=r.getPayload()._id;i.pin={},i.formVisible=!1,i.belongsToUser=!1,i.toggleForm=n,i.deletePin=t,o.get(e.params).$promise.then(function(o){i.board=o,i.user=o.user,o.user._id===s&&(i.belongsToUser=!0)}),i.createPin=l,i.like=a,i.isLoggedIn=r.isAuthenticated}function BoardsEditController(o,e){function r(){n.board.$update(function(){e.go("boardsShow",e.params)})}function t(){n.board.$remove(function(){e.go("boardsIndex")})}var n=this;n.board=o.get(e.params),n.delete=t,n.update=r}function MainController(o,e,r){function t(){a.menuVisible=!a.menuVisible}function n(){o.logout().then(function(){e.go("home")})}function l(r,t){a.menuVisible=!1,a.message=null,!o.isAuthenticated()&&i.includes(t.name)&&(r.preventDefault(),e.go("login"),a.message="You must be logged in to go there!")}var a=this;a.isLoggedIn=o.isAuthenticated,a.toggleNav=t,a.menuVisible=!1,a.logout=n,a.message=null;var i=[];r.$on("$stateChangeStart",l)}function Pin(o){return new o("/pins/:id",{id:"@_id"},{update:{method:"PUT"}})}function User(o){return new o("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}angular.module("pinboardApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("pinboardApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("pinboardApp").factory("Board",Board),Board.$inject=["$resource"],angular.module("pinboardApp").controller("BoardsIndexController",BoardsIndexController).controller("BoardsNewController",BoardsNewController).controller("BoardsShowController",BoardsShowController).controller("BoardsEditController",BoardsEditController).controller("BoardsProfileController",BoardsProfileController),BoardsIndexController.$inject=["Board"],BoardsProfileController.$inject=["Board","$auth"],BoardsNewController.$inject=["Board","$state","$auth"],BoardsShowController.$inject=["Board","$state","$auth"],BoardsEditController.$inject=["Board","$state"],angular.module("pinboardApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("pinboardApp").factory("Pin",Pin),Pin.$inject=["$resource"],angular.module("pinboardApp").factory("User",User),User.$inject=["$resource"];
//# sourceMappingURL=app.js.map
