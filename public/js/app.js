"use strict";function Router(t,e){t.state("home",{url:"/",templateUrl:"/templates/home.html"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}),e.otherwise("/")}function Auth(t){t.loginUrl="/login",t.signupUrl="/register",t.tokenPrefix=""}function RegisterController(t,e){function o(){t.signup(r.user).then(function(){e.go("login")})}var r=this;r.user={},r.submit=o}function LoginController(t,e){function o(){t.login(r.credentials).then(function(){e.go("home")})}var r=this;r.credentials={},r.submit=o}function MainController(t,e,o){function r(){t.logout().then(function(){e.go("home")})}function n(o,r){l.message=null,!t.isAuthenticated()&&i.includes(r.name)&&(o.preventDefault(),e.go("login"),l.message="You must be logged in to go there!")}var l=this;l.isLoggedIn=t.isAuthenticated,l.logout=r,l.message=null;var i=[];o.$on("$stateChangeStart",n)}angular.module("pinboardApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("pinboardApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("pinboardApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"];
//# sourceMappingURL=app.js.map
